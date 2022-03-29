import { userMethods } from "../../../constants/reducers"
import { changeGlicemyTimeFormat, glicemyDateFormatter, registerUser } from "../../../utils/firebaseQuery";
import { loginStatus } from "../../../constants/states";

const initialState = {
    status:loginStatus.unlogged,
    userId:"zLZqvcoV2egpiguiJKxN5i9vrPK2",
    userData:{
        email:"",
        password:"",
        name:"dummy",
        surname:"",
        weight:80,
        height:180,
        birthday:{seconds:0,nanoseconds:0},
        isf:0,
        choratio:0,
        glicemy:[],
        maxCarb:200,
        maxFat:100,
        maxProt:40,
    }
}

const login = (state,payload) =>{
    const usrData = payload.usrData;

    const newState = {...state};

    newState.status = loginStatus.logged;
    newState.userData = usrData;

    return newState;
}

const del = (state,payload) =>{
    
}


const register = (state,payload) =>{
    const newstate ={...state};

    newstate.userData = payload.user;
    newstate.status = loginStatus.logged;

    return newstate;
}

const addGlicemy = (state,payload) =>{
    const newstate ={...state};

    const id = glicemyDateFormatter();

    const g = {...payload.glicemy};//;

    newstate.userData.glicemy[id].push(changeGlicemyTimeFormat(g));
    return newstate;
}

const update = (state,payload) =>{
    const newstate = {...state};

    newstate.userData = payload.user;

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
        case userMethods.updateUser:
            return update(state,action.payload);
        case userMethods.addGlicemy:
            return addGlicemy(state,action.payload);
        case userMethods.logout:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;