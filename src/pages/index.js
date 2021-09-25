import Table from "./Table"
import Login from "./Login"
import { UserProvider } from "../contexts/userContext"
import { AbilityContext } from '../contexts/abilityContext'
import { Ability } from '@casl/ability'

function LandingPage(props) {
    const ability = new Ability
	return (
		<>
            <AbilityContext.Provider value={ability}>
                <UserProvider ability={ability}>
                    <Login/>
                    <Table ability={ability}/>
                </UserProvider>
            </AbilityContext.Provider>
        </>
	)
}

export default LandingPage
