import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user user:email'
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, user, token }) {
            try {
                return {
                    ...session,
                    id: user.id
                };
            } catch {
                return {
                    ...session,
                     id: null,
                };
            }
        },

        async signIn({ user, account, profile, email, credentials }) {
            try {
                // console.log(user); id, name, email, img
                return true;
            } catch (err) {
                return false;
            }
        },
    }
}
export default NextAuth(authOptions)
