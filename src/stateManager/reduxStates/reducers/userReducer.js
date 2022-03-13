import { userMethods } from "../../../constants/reducers"
import { registerUser } from "../../../utils/firebaseQuery";
import { loginStatus } from "../../../constants/states";

import * as database from "../../../utils/firebaseQuery"


const initialState = {
    status:loginStatus.unlogged,
    userData:{
        email:"",
        password:"",
        name:"Nicola",
        surname:"",
        weight:80,
        height:180,
        birthday:{seconds:0,nanoseconds:0},
        isf:0,
        choratio:0,
    }
}

const login = (state,payload) =>{
    //TODO SEE HOW USE MIDDLEWARE TO DO ASYNCH REQ INSIDE REDUCER 
    const email = payload.email;
    const psw = payload.psw;


    const newState = {...state};

    newState.status = loginStatus.logged;

    return newState;

}

const del = (state,payload) =>{
    
}

const register = (state,payload) =>{
    const newstate ={...state};

    //TODO CHECK USER INPUT LIKE PASSWORD ETC... (save hash of psw and not psw)

    newstate.userData = payload.user;
    database.registerUser(newstate.userData);

    return newstate;
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