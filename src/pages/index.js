import Table from "./Table"
import Login from "./Login"
import { UserProvider } from "../contexts/userContext"

function LandingPage(props) {

	return (
		<>
            <UserProvider>
                <Login/>

                <Table/>
            </UserProvider>
        </>
	)
}

export default LandingPage
