import { firebase } from "@react-native-firebase/firestore";
import { userMethods } from "../../../constants/reducers"

import * as database from "../../../utils/firebaseQuery"
import * as localStorage from '../../../utils/localStoreManager'

/**
 * check all user inputs and try to register
 * if all ok send data to firebase and register
 * else return an error code or an error message to show user
 * @param {*} user user data to register
 * @returns error code
 */
export const register = async (user) => async dispatch =>{
    //ASYNC ACTION:
    //TODO CHECK USER INPUTS ARE OK (psw length, email not exist etc...)
    await database.registerUser(user);
    
    console.log("REGISTER OK");

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
    //Get user data
    const usrData = (await database.getUserData(email));
    const glicemy = (await database.getUserGlicemy(email));

    usrData.glicemy = glicemy;

    console.log("GLICEMY = " + JSON.stringify(glicemy));

    //SAVE DATA TO LOCAL STORAGE

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
export const addGlicemy = (email,glicemyValue) => async dispatch =>{

    const time = firebase.firestore.FieldValue.serverTimestamp();
    //GET TIMESTAMP
    const glicemy = {value: glicemyValue,time:time};

    //UPDATE FIREBASE IF POSSIBLE; IF NOT ADD A PENDING UPDATE (TODO)
    database.addGlicemyValue(email,glicemy);

    //REDUX DISPATCH
    dispatch({
        type:userMethods.addGlicemy,
        payload:{glicemy:glicemy}
    })
}