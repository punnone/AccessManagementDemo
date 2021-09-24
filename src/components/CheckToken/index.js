import jwt from "jsonwebtoken";
import Cookie from "js-cookie"

export const verify = (token) => {
    let verify 
    try {
        console.log("verify try")
        verify = jwt.verify(token,process.env.REACT_APP_SECRET)
    } catch (error) {
        console.log("verify catch",error)
        verify = false
    }
    return verify
} 