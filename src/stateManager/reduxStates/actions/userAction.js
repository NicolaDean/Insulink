import { firebase } from "@react-native-firebase/firestore";
import { foodMethods, userMethods } from "../../../constants/reducers"

import { localStorage } from "../../../utils/localStoreManager";

import * as authSys from '../../../utils/auth'
import { loginStatus } from "../../../constants/states";
import { FirebaseQuery } from "../../../utils/firebaseQuery";

/**
 * check all user inputs and try to register
 * if all ok send data to firebase and register
 * else return an error code or an error message to show user
 * @param {*} user user data to register
 * @returns error code
 */
export const register = (user) => async dispatch =>{
    //ASYNC ACTION:
    //TODO CHECK USER INPUTS ARE OK (psw length, email not exist etc...)

    console.log("Reg Start:");
    const id = (await authSys.register(user.email,user.password)).uid;

    console.log("Reg END:" + id);
    await FirebaseQuery.registerUser(id,user);
    console.log("REGISTER OK");

    let glicemyData = {};
    let date = FirebaseQuery.glicemyDateFormatter();
    glicemyData[date] = [];

    user.glicemy = glicemyData;

    //await localStorage.setDataAvailability(true);
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

    console.log("CIAO");
    //ASYNC ACTION (eg check values on DB)

    //CHECK LOGIN DATA
    const user = await authSys.login(email,psw);
    if(user == null) {return null}; //BAD LOGIN (make return an error)
    //Get user data
    const usrData = (await FirebaseQuery.getUserData(user.uid));
    const glicemy = (await FirebaseQuery.getUserGlicemy(user.uid));
    usrData.glicemy = glicemy;
    usrData.uid = user.uid;

    //CHECK FOR EMPTY DATA:
    usrData.age = 20; //TODO CALCULATE AGE FROM BIRTHDAY
    console.log("Login ok" + JSON.stringify(usrData));

    //SAVE DATA TO LOCAL STORAGE
    await localStorage.saveUserData(usrData);

    //REDUX DISPATCH
    dispatch({
        type: userMethods.login,
        payload: {
            usrData: usrData,
            userId:user.uid,
        }
    });

    //LOAD OTHER USER DATA FROM FIREBASE (EG: MEAL DIARY)
    return true;
} 


export const googleLogin = (uid,errorFunc) => async dispatch =>{

    //Get user data
    const usrData = (await FirebaseQuery.getUserData(uid));
    const glicemy = (await FirebaseQuery.getUserGlicemy(uid));

    if(usrData == null){
        console.log("This google account isnt registered yet");
        const error = [{title:"Not Registered",body:"Please register with this google account"}];
        errorFunc(error);
        return false;
    }

    usrData.glicemy = glicemy;
    
    //CHECK FOR EMPTY DATA:
    usrData.age = 20; //TODO CALCULATE AGE FROM BIRTHDAY
    console.log("Login ok" + JSON.stringify(usrData));

    //SAVE DATA TO LOCAL STORAGE
    await localStorage.saveUserData(usrData);

    //REDUX DISPATCH
    dispatch({
        type: userMethods.login,
        payload: {
            usrData: usrData,
            userId:user.uid,
        }
    });

    //LOAD OTHER USER DATA FROM FIREBASE (EG: MEAL DIARY)
    return true;
} 


/**
 * try to load user data from memory, if not possible return false
 * @returns true if user is logged, false if not
 */
export const loadUserLocalData = ([logged,setLogged]) =>async( dispatch, getState) => {
    
    //LOAD USER DATA FROM LOCAL STORAGE
    let userData = await localStorage.getUserData();

    //CHECK IF DATA ARE AVAILABLE OR NULL IS RETURNED
    if(userData === null){
        return false;
    }else{
        //DO A Fake Login (Load data from local storage to redux)
        dispatch({
            type: userMethods.login,
            payload: {
                usrData: userData,
                userId: userData.uid
            }
        });
        setLogged(true);
    
        const currState = getState();

        let mealDiary = null;

        //LOAD MEAL DIARY IF EXIST AND STORE IT INTO REDUX
        mealDiary = await localStorage.loadFoodDiary(FirebaseQuery.glicemyDateFormatter());

        console.log("LOADED DIARY FROM STORAGE")
        console.log("DIARY: " + JSON.stringify(mealDiary))
        if(mealDiary!=null){
            dispatch({
                type: foodMethods.loadFoodDiary,
                payload:{
                    diary:mealDiary
                }
            })
        }

        return true;
    }
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

    //UPDATE FIREBASE IF POSSIBLE; IF NOT ADD A PENDING UPDATE (TODO)
    FirebaseQuery.addGlicemyValue(userId,glicemy);
    localStorage.storeGlicemyData(glicemy,date);

    //REDUX DISPATCH
    dispatch({
        type:userMethods.addGlicemy,
        payload:{glicemy:glicemy}
    })
}