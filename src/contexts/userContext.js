import React, { useState, createContext } from 'react'
import decode from "jwt-decode"
import Cookie from "js-cookie"
import { TableAPI } from '../services/TableAPI' // fetchAPI
import { updateAbility } from "../utils/Abilities"

export const UserContext = createContext({
    user: [],
    permission : [],
    loading : false,
    getPermission: () => {},
    userLogin : () => {}
})

export const UserProvider = ({ children , ability }) => {
    
    const [user, setUser] = useState(null)
    const [permission, setPermission] = useState(null)
    const [loading,setLoading] = useState(false)

    function userLogin({username, password}) {
        setLoading(true)
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
            setLoading(false)
        })
    }

    function getPermission(params) {
        // console.log("getPermission")
        if(Cookie.get("access_token")){
            TableAPI.getPermissions({ 
                token: Cookie.get("access_token")
            })
            .then((prms) => {
                const zpermission = updateAbility(prms.permissions)
                ability.update(zpermission)
                setPermission(prms.permissions)
                setLoading(false)
            })
            .catch((err) => {
                alert("Get permission is went wrong. Plese try again.")
                setLoading(false)
            })
        }else{
            alert("Please login")
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            permission,
            loading,
            getPermission,
            userLogin
        }}>
            {children}
        </UserContext.Provider>
    )
}
