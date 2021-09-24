import React, { useContext } from 'react'
import { UserRoles } from '../../utils/MockupData'
import {UserContext} from "../../contexts/userContext"

function LandingPage() {
    const userContext = useContext(UserContext)

	return (
        <header className="header">
            <ul className="roles">
            {
                UserRoles.map((user, index) => {
                    return (
                        <React.Fragment>
                            <li>
                                <button
                                    type="button"
                                    name={user.username}
                                    // className={onClickSelectRole(`${user.role}`) ? 'selected' : ''}
                                    onClick={() => userContext.userLogin({
                                        username : user.username,
                                        password : user.password
                                    })}
                                >
                                    {user.username}
                                </button>
                            </li>
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </header>
	)
}

export default LandingPage
