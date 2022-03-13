import { userMethods } from "../../../constants/reducers"


export const register = (user) =>{
    return{
        type: userMethods.registerUser,
        payload: {user:user}
    }
} 

export const del = (user) =>{
    return{
        type: userMethods.deleteUser,
        payload: {user:user}
    }
} 

export const login = (email,psw) =>{
    return{
        type: userMethods.login,
        payload: {
            email:email,
            psw:psw,
        }
    }
} 