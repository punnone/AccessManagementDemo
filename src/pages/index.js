import Table from "./Table"
import Login from "./Login"
import { UserProvider } from "../contexts/userContext"
import { AbilityContext } from '../contexts/abilityContext'
import { Ability } from '@casl/ability'
import { TableShowProvider } from "../contexts/tableShowContext"
import '../assets/css/App.css'
import '../assets/css/tailwind.css'

const ability = new Ability()

function LandingPage(props) {
    
	return (
		<>
            <AbilityContext.Provider value={ability}>
                <UserProvider ability={ability}>
                    <div className="App">
                        <Login/>
                        <TableShowProvider>
                            <Table ability={ability}/>
                        </TableShowProvider>
                    </div>
                </UserProvider>
            </AbilityContext.Provider>
        </>
	)
}

export default LandingPage
