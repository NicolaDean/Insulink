import { firebase } from "@react-native-firebase/firestore";
import { userMethods } from "../../../constants/reducers"

import * as database from "../../../utils/firebaseQuery"
import * as localStorage from '../../../utils/localStoreManager'
import * as authSys from '../../../utils/auth'

/**
 * check all user inputs and try to register
 * if all ok send data to firebase and register
 * else return an error code or an error message to show user
 * @param {*} user user data to register
 * @returns error code
 */
export const register = (user,password) => async dispatch =>{
    //ASYNC ACTION:
    //TODO CHECK USER INPUTS ARE OK (psw length, email not exist etc...)

    console.log("Reg Start:");
    const id = (await authSys.register(user.email,password)).uid;

    console.log("Reg END:" + id);
    await database.registerUser(id,user);
    
    console.log("REGISTER OK");

    await localStorage.setDataAvailability(true);
    //SAVE DATA TO LOCAL STORAGE

    //REDUX DISPATCH
    dispatch({
        type: userMethods.registerUser,
        payload: {user:user}
    });
} 

/**
 * edit user data
 * @param {*} userData 
 * @returns 
 */
export const editUserData = (userData) => async dispatch =>{


    //Save updated user data to local storage
    //localStorage.saveUserData(userData);
    //Firebase Update
    //database.udpateUser(userData);

    console.log("Edit Completed");
    //REDUX DISPATCH
    dispatch({
        type: userMethods.updateUser,
        payload: {user:userData}
    });
}


export const del = (user) =>{

    //REDUX DISPATCH
    dispatch({
        type: userMethods.deleteUser,
        payload: {user:user}
    });
} 

/**
 * retrive user data from firebase, check correctness of login
 * if login is ok save data to local storage and into redux state
 * @param {*} email id of user
 * @param {*} psw password for login
 * @returns true or false (false if login is not ok)
 */
export const login = (email,psw) => async dispatch =>{

    //ASYNC ACTION (eg check values on DB)

    //CHECK LOGIN DATA
    const user = await authSys.login(email,psw);

    //Get user data
    const usrData = (await database.getUserData(user.uid));
    
    const glicemy = (await database.getUserGlicemy(user.uid));

    usrData.glicemy = glicemy;

    //CHECK FOR EMPTY DATA:
    usrData.age = 20; //TODO CALCULATE AGE FROM BIRTHDAY
    
    console.log("Login ok" + JSON.stringify(usrData));

    await localStorage.setDataAvailability(true);
    await localStorage.saveUserData(usrData);

    //if(login not good) return false;

    //REDUX DISPATCH
    dispatch({
        type: userMethods.login,
        payload: {
            usrData: usrData
        }
    });

    return true;
} 


/**
 * remove all user data from local storage and execute logout
 * @param {*} email id of user
 * @returns nothing
 */
export const logout = (email) => async dispatch =>{
    //ASYNC ACTION (eg check values on DB)

    await localStorage.resetUser();

    //REDUX DISPATCH
    dispatch({
        type: userMethods.logout
    });
}

/**
 * 
 * @param {*} email id of user
 * @param {*} glicemyValue an integer representing the value of glicemy in this specific moment
 * @returns nothing
 */
export const addGlicemy = (userId,glicemyValue) => async dispatch =>{

    const date = new Date();
    //GET TIMESTAMP
    const glicemy = {value: glicemyValue,time:date};

    console.log("G: " + JSON.stringify(glicemy));
    //UPDATE FIREBASE IF POSSIBLE; IF NOT ADD A PENDING UPDATE (TODO)
    database.addGlicemyValue(userId,glicemy);

    //REDUX DISPATCH
    dispatch({
        type:userMethods.addGlicemy,
        payload:{glicemy:glicemy}
    })
}