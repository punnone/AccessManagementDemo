import React, { useState, createContext } from 'react'
import decode from "jwt-decode"
import Cookie from "js-cookie"
import { TableAPI } from '../services/TableAPI' // fetchAPI
import { updateAbility } from "../utils/Abilities"

export const UserContext = createContext({
    user: [],
    // setUser: () => {},
    getPermission: () => {},
    userLogin : () => {}
})

export const UserProvider = ({ children , ability }) => {
    const [user, setUser] = useState(null)
    const [permission, setPermission] = useState(null)

    function userLogin({username, password}) {
        // setLoading(true)
        // console.clear()
        // POST Username, Password then return { permissions: <object>, role: <string>, username: <string>, _id: <string> }

        TableAPI.doAuthorization({ 
            username: username, 
            password: password
        })
        .then(({ accessToken, refreshToken }) => {
            // console.table({ accessToken, refreshToken })
            console.log("usernameee ",username)
            if(username === "admin"){
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMyMzg2NDg4LCJleHAiOjE2MzU1ODUyMjQsInJvbGUiOiJvd25lciJ9.Jr5KtFpIayf-5Cc_zAqbbBmFR4W2v85etl7Oq3pqgEM"
                Cookie.set("access_token",token)
                setUser(decode(token))
            }else{
                Cookie.set("access_token",accessToken)
                setUser(decode(accessToken))
            }
            getPermission()
        })
        .catch((error) => {
            console.log("login error", error )
            setUser("NULL")
            Cookie.remove("access_token")
            // setLoading(false)
        })
    }

    function getPermission(params) {
        console.log("getPermission")
        const owner = [
            "read:thing",
            "update:thing",
            "read:uid",
            "read:alarm",
            "read:cctv",
            "update:alarm"
        ]

        const admin = [
            "read:thing",
            "update:thing",
            "read:alarm",
            "update:alarm"
        ]

        setPermission(admin)
        const zpermission = updateAbility(admin)
        console.log("zpermission",zpermission)
        ability.update(zpermission)

         // TableAPI.getPermissions({ token: accessToken })
            // .then((user) => {
            //     // let ability = defineAbilitiesOnTableFor(user)
            //     const rules = updateAbility(user)

            //     ability.update(rules)
            //     checkActionWithPermissions(ability, user?.role)
            //     setRole(e.target.name)
            //     setTableName(`Table ${e.target.name}`)
            //     setLoading(false)
            // })
    }

    return (
        <UserContext.Provider value={{
            user,
            // setUser,
            getPermission,
            userLogin
        }}>
            {children}
        </UserContext.Provider>
    )
}
