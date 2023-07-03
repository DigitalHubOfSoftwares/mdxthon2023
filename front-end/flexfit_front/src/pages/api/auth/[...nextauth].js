import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Email", type: "email", placeholder: "Email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const obj = Object.assign({},credentials)
          // Add logic here to look up the user from the credentials supplied
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({username: obj?.email, password: obj?.password}),
            headers: { "Content-Type": "application/json" }
          })

          const user = await res.json();
          console.log(user);
          if (!user.error) {
            // Any object returned will be saved in `user` property of the JWT
            const userObject = {email : user.user}
            return {email : user.user};
          } else {
            console.log('login failed');
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)