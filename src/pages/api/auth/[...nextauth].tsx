import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';

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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
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
                     id: token.sub,
                    isDonor: false,
                    lastDonate: null,
                };
            }
        },

        async signIn({ user, account, profile, email, credentials }) {
            try {
                return await fetch('http://localhost:3000/api/email/successLogin', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(resp => resp.json())
                    .then(resp => resp.success)
                    .catch(err => {
                        return false;
                    });
            } catch (err) {
                return false;
            }
        },
    }
}
export default NextAuth(authOptions)
