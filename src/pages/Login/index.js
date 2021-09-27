import React, { useContext,useState } from 'react'
import {UserContext} from "../../contexts/userContext"

function LandingPage() {
    const userContext = useContext(UserContext)

    const [username,setUsername] = useState("a")
    const [password,setPassword] = useState("P@ssw0rd")

	return (
        <header className="header">
            <ul className="roles">
                Username: &nbsp; &nbsp; 
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                &nbsp; &nbsp; &nbsp; &nbsp; 
                Password: &nbsp; &nbsp; 
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                &nbsp; &nbsp; &nbsp; &nbsp; 
                <button
                    className=""
                    onClick={() => userContext.userLogin({
                        username : username,
                        password : password
                    })}
                >
                    Login
                </button>
                <br></br><br></br>
                <hr/>
            </ul>
        </header>
	)
}

export default LandingPage
