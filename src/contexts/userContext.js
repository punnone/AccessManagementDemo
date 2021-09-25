import React, { useState, createContext } from 'react'
import decode from "jwt-decode"
import Cookie from "js-cookie"
import { TableAPI } from '../services/TableAPI' // fetchAPI
import { updateAbility } from "../utils/Abilities"

export const UserContext = createContext({
    user: [],
    permission : [],
    getPermission: () => {},
    userLogin : () => {}
})

export const UserProvider = ({ children , ability }) => {
    const [user, setUser] = useState(null)
    const [permission, setPermission] = useState(null)

    function userLogin({username, password}) {
        TableAPI.authen({ 
            username: username, 
            password: password
        })
        .then(({ accessToken, refreshToken }) => {
            // console.table({ accessToken, refreshToken })
            // console.log("usernameee ",username)
            // if(username === "admin"){
            //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMyMzg2NDg4LCJleHAiOjE2MzU1ODUyMjQsInJvbGUiOiJvd25lciJ9.Jr5KtFpIayf-5Cc_zAqbbBmFR4W2v85etl7Oq3pqgEM"
            //     Cookie.set("access_token",token)
            //     setUser(decode(token))
            // }else{
            Cookie.set("access_token",accessToken)
            setUser(decode(accessToken))
            // }
            getPermission()
        })
        .catch((error) => {
            console.log("login error", error )
            setUser(null)
            Cookie.remove("access_token")
            // setLoading(false)
        })
    }

    function getPermission(params) {
        console.log("getPermission")
        if(Cookie.get("access_token")){
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
    
            TableAPI.getPermissions({ 
                token: Cookie.get("access_token")
            })
            .then((prms) => {
                // let ability = defineAbilitiesOnTableFor(user)
                setPermission(prms)
                const zpermission = updateAbility(prms)
                ability.update(zpermission)
            })
            .catch((err) => {
                alert("Get permission is went wrong. Plese try again.")
            })
        }else{
            alert("Please login")
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            permission,
            getPermission,
            userLogin
        }}>
            {children}
        </UserContext.Provider>
    )
}
