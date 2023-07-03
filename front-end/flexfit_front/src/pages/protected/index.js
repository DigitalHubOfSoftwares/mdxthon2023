import { signOut, useSession } from "next-auth/react"
import withAuthProtection from "../../components/withAuthProtection/withAuthProtection"


const Protected = () => {
    const { data: session, status } = useSession()
    if (status == 'authenticated') {
      return (
        <>
          Signed in as {JSON.stringify(session)} <br />
          <button onClick={signOut}>sign out</button>
        </>
      )
    }
    return (
      <>
        {JSON.stringify(session)} <br />
      </>
    )
}

export default withAuthProtection(Protected, '/login');