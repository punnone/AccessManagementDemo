import React, { useContext,useState } from 'react'
import {UserContext} from "../../contexts/userContext"

function LandingPage() {
    const userContext = useContext(UserContext)

    const [username,setUsername] = useState("owner")
    const [password,setPassword] = useState("1234")

	return (
        <>
            <header className="tw-my-2">
                <div className="tw-flex tw-items-center tw-mx-5 tw-justify-center">
                    <label className="tw-pr-2">Username:</label>
                    <input
                        className="tw-input-basic tw-mr-3"
                        style={{
                            width:"250px"
                        }}
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="tw-pr-2">Password:</label>
                    <input
                        className="tw-input-basic"
                        style={{
                            width:"250px"
                        }}
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    &nbsp; &nbsp; &nbsp; &nbsp; 
                    <button
                        className="tw-btn-blue"
                        onClick={() => userContext.userLogin({
                            username : username,
                            password : password
                        })}
                    >
                        Login
                    </button>
                </div>
            </header>  
            <hr/>
        </>
	)
}

export default LandingPage
