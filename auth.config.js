export const authConfig = {
    session: {
      strategy: 'jwt',
    },
  providers: [],
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  callbacks: {
    async session ( session ) 
    {
      // console.log( "session auth config", session );
      return session;
    },
  },
}