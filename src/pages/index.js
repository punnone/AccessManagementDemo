import Table from "./Table"
import Login from "./Login"
import { UserProvider } from "../contexts/userContext"
import { AbilityContext } from '../contexts/abilityContext'
import { Ability } from '@casl/ability'
import { TableShowProvider } from "../contexts/tableShowContext"

function LandingPage(props) {
    const ability = new Ability
	return (
		<>
            <AbilityContext.Provider value={ability}>
                <UserProvider ability={ability}>
                    <Login/>
                    <TableShowProvider>
                        <Table ability={ability}/>
                    </TableShowProvider>
                </UserProvider>
            </AbilityContext.Provider>
        </>
	)
}

export default LandingPage
