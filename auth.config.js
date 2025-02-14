export const authConfig = {
    // trustHost: true,
    session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
    },
    providers: [],
 }