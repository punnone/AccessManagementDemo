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
        .then((response) => {
            Cookie.set("access_token",response.token)
            setUser(decode(response.token))
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
        // console.log("getPermission")
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
                setPermission(prms.permissions)
                const zpermission = updateAbility(prms.permissions)
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
