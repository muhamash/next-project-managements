import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";
import { authConfig } from "./auth.config";
import { prisma } from "./services/prisma";

async function refreshAccessToken(token) {
  try {
    const existingToken = await prisma.token.findFirst({
      where: { userId: token.user.id, expiresAt: { gt: new Date() } },
    });

    if (!existingToken) throw new Error("No valid refresh token found");

    return {
      ...token,
      accessToken: existingToken.token,
      accessTokenExpires: existingToken.expiresAt.getTime(),
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth( {
  adapter: PrismaAdapter( prisma ),
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider( {
      // name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize ( credentials )
      {
        const { email, password } = credentials || {};

        // console.log( email, password );
        if ( !email || !password )
        {
          throw new Error( "All fields are required" );
        }

        const user = await prisma.user.findUnique( {
          where: { email },
        } );

        // console.log( user );
        if ( !user || !( await bcryptjs.compare( password, user.password ) ) )
        {
          throw new Error( "Invalid email or password" );
        }

        // Generate new session and refresh tokens
        const newSessionToken = uuidv4();
        // const newRefreshToken = `${uuidv4()}-${new Date().toISOString()}`;
        const expiresIn = 60 * 1000; // 1 minute
        const newExpires = new Date( Date.now() + expiresIn );

        // Create or update session in the database
        let session = await prisma.token.findFirst( {
          where: { userId: user.id },
        } );

        if ( session )
        {
          session.token = newSessionToken;
          session.expiresAt = newExpires;
          await prisma.token.update( {
            where: { id: session.id },
            data: { token: newSessionToken, expiresAt: newExpires },
          } );
        } else
        {
          await prisma.token.create( {
            data: {
              token: newSessionToken,
              userId: user.id,
              expiresAt: newExpires,
            },
          } );
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: newSessionToken,
          // refreshToken: newRefreshToken,
          accessTokenExpires: newExpires.getTime(),
        };
      },
    } ),
  ],
  // events: {
  //   async signIn ( { user, account } )
  //   {
  //     const existingUser = await prisma.user.findUnique( {
  //       where: { email: user.email },
  //     } );

  //     if ( !existingUser )
  //     {
  //       await prisma.user.create( {
  //         data: {
  //           name: user.name,
  //           email: user.email,
  //           role: "USER",
  //           image: user.image,
  //         },
  //       } );
  //     }
  //   },
  // },
  callbacks: {
    async jwt ( { token, user, account } )
    {
      // Initial sign-in
      if ( account && user )
      {
        if ( account.provider === "credentials" )
        {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpires: user.accessTokenExpires,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          };
        }
      }

      // Refresh token if expired
      if ( token.accessTokenExpires && Date.now() > token.accessTokenExpires )
      {
        return refreshAccessToken( token );
      }

      return token;
    },

    async session ( { session, token } )
    {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
} );