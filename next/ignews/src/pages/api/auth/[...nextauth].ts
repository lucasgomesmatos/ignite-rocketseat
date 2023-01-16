import { query as q } from "faunadb";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../service/fauna";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: 'read:user',
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   secret: process.env.SIGNING_KEY ?? ''
  // },
  callbacks: {
    async signIn({ user, account, profile, credentials }: any) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ))
        return true;
      } catch {
        return false;
      }

    }
  }
}

export default NextAuth(authOptions)

