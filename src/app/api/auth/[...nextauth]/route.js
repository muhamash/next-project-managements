import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../services/prisma";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth( {
    adapter: PrismaAdapter( prisma ),
    ...authConfig,
    providers: [
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize ( credentials )
            {
                const user = await prisma.user.findUnique( {
                    where: { email: credentials.email }
                } )

                if ( !user ) return null
                if ( !bcrypt.compareSync( credentials.password, user.password ) ) return null

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        } )
    ]
} );