import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { getById } from "../../../services/firebaseConnection";

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
        async session({ session, token }) {
            try {
                const donor = await getById('donors', token.sub);
                return {
                    ...session,
                    id: token.sub,
                    isDonor: donor?.donate ?? false,
                    lastDonate: donor?.lastDonate.toDate() ?? null
                };
            } catch {
                return {
                    ...session,
                     id: null,
                    isDonor: false,
                    lastDonate: null,
                };
            }
        },

        async signIn({ user, account, profile, email, credentials }) {
            try {
                return true;
            } catch (err) {
                return false;
            }
        },
    }
}
export default NextAuth(authOptions)
