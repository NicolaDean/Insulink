import { userMethods } from "../../../constants/reducers"
import { registerUser } from "../../../utils/firebaseQuery";

import * as database from "../../../utils/firebaseQuery"
const initialState = {

}

const login = (state,payload) =>{
    //TODO SEE HOW USE MIDDLEWARE TO DO ASYNCH REQ INSIDE REDUCER 
}

const del = (state,payload) =>{
    
}

const register = (state,payload) =>{
    let newstate ={...state};

    const user = payload.user;

    database.registerUser(user);

    return user;
}


const userReducer = (state = initialState, action) => {
    switch(action.type){
        case userMethods.login:
            return login(state,action.payload);
        case userMethods.deleteUser:
            return del(state,action.payload);
        case userMethods.registerUser:
            return register(state,action.payload);
        case userMethods.logout:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;