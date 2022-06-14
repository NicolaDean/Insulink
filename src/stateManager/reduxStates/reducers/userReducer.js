import { userMethods } from "../../../constants/reducers"
import {  FirebaseQuery } from "../../../utils/firebaseQuery";
import { loginStatus } from "../../../constants/states";

export const initialState = {
    status:loginStatus.unlogged,
    userId:"nullId",
    mustCompleteReg:false,
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
        activitys:undefined,
        maxCarb:200,
        maxFat:100,
        maxProt:40,
    }
}

const login = (state,payload) =>{
    const usrData = payload.usrData;

    const newState = {...state};

    console.log("THIS USER HAS : " +payload.userId )
    newState.userId = payload.userId;
    newState.status = loginStatus.logged;
    newState.userData = usrData;
    return newState;
}

const del = (state,payload) =>{
    
}

const logout = (state,payload) =>{
    const newState = {...initialState};

    return {...initialState};
}


const register = (state,payload) =>{
    const newstate ={...state};
    newstate.userId = payload.userId;
    newstate.userData = payload.user;
    newstate.status = loginStatus.logged;
    newstate.mustCompleteReg = false;
    
    return newstate;
}

const addGlicemy = (state,payload) =>{
    const newstate ={...state};

    const id = FirebaseQuery.glicemyDateFormatter();

    const g = {...payload.glicemy};//;

    if(newstate.userData.glicemy[id] == undefined) newstate.userData.glicemy[id] = [];

    newstate.userData.glicemy[id].push(g);
    //console.log(newstate.userData.glicemy[id]);
    return newstate;
}

const update = (state,payload) =>{
    const newstate = {...state};

    newstate.userData = payload.user;

    return newstate;
}

const setId = (state,payload) =>{
    const newstate = {...state};

    newstate.userId = payload.uid;
    newstate.mustCompleteReg = true;

    return newstate;
}

const addActivity = (state,payload) =>{
    const newstate = {...state};

    const cal = payload.activity.calories;
    const today = FirebaseQuery.glicemyDateFormatter(new Date(),true);

    let pos = -1;
    let i = 0;
    let x = [];

    if(newstate.userData.activitys == undefined) newstate.userData.activitys = [];
    console.log("ACTIV: " + JSON.stringify(newstate.userData.activitys));
    newstate.userData.activitys.forEach(act=>{
        if(act.date == today){
            pos = i;
        }
        i++;
    });

    if(pos != -1){
        newstate.userData.activitys[pos].count += cal;
    }else{
        newstate.userData.activitys.push({date: today, count: cal});
    }

    console.log("NEW STATE: " + JSON.stringify(newstate.userData.activitys));

    return newstate;
}

const removeActivity = (state,payload) =>{
    const newstate = {...state};
    const today = FirebaseQuery.glicemyDateFormatter(new Date(),true);
    const cal = payload.activity.calories;
    let pos = -1;
    let i = 0;
    
    if(newstate.userData.activitys == undefined) newstate.userData.activitys = [];
    console.log("ACTIV: " + JSON.stringify(newstate.userData.activitys));
    newstate.userData.activitys.forEach(act=>{
        if(act.date == today){
            pos = i;
        }
        i++;
    });

    if(pos != -1){
        newstate.userData.activitys[pos].count -= cal;
    }
    return newstate;
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case userMethods.login:
            return login(state,action.payload);
        case userMethods.setId:
            return setId(state,action.payload);
        case userMethods.deleteUser:
            return del(state,action.payload);
        case userMethods.registerUser:
            return register(state,action.payload);
        case userMethods.updateUser:
            return update(state,action.payload);
        case userMethods.addGlicemy:
            return addGlicemy(state,action.payload);
        case userMethods.addActivity:
            return addActivity(state,action.payload);
        case userMethods.removeActivity:
            return removeActivity(state,action.payload);
        case userMethods.logout:
            return logout(state,action.payload);
        default:
            return state;
    }
}

export default userReducer;