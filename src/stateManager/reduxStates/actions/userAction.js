import { firebase } from "@react-native-firebase/firestore";
import { foodMethods, userMethods } from "../../../constants/reducers"

import { localStorage } from "../../../utils/localStoreManager";

import * as authSys from '../../../utils/auth'
import { loginStatus } from "../../../constants/states";
import { FirebaseQuery } from "../../../utils/firebaseQuery";
import { registrationErrors } from "../../../constants/registrationSteps";
import { resetError, showError } from "./errorAction";

/**
 * check all user inputs and try to register
 * if all ok send data to firebase and register
 * else return an error code or an error message to show user
 * @param {*} user user data to register
 * @returns error code
 */
export const register = (user,googleId=null,errorFunc = (e)=>{}) => async dispatch =>{
    dispatch(resetError());
    //ASYNC ACTION:
    //TODO CHECK USER INPUTS ARE OK (psw length, email not exist etc...)
    const displayError = (e) => {dispatch(showError(e))};
    //errorFunc([registrationErrors.invalidChoratio])
    console.log("Reg Start:");
    let id;
    if(googleId==null){
        const usr = (await authSys.register(user.email,user.password,errorFunc));
        if(usr == null) {return;}

        id = usr.uid;
    }else{
        id = googleId
    }
    
    console.log("Reg END:" + id);
    await FirebaseQuery.registerUser(id,user,displayError);
    console.log("REGISTER OK");

    let glicemyData = {};
    let date = FirebaseQuery.glicemyDateFormatter();
    //glicemyData[date] = [{}];

    user.glicemy = [];
    user.activitys = [];
    //SAVE DATA TO LOCAL STORAGE
    await localStorage.saveUserData(user);
    
    dispatch({
        type: userMethods.registerUser,
        payload: {user:user,userId:id}
    });
   
} 

/**
 * edit user data
 * @param {*} userData 
 * @returns 
 */
export const editUserData = (userData) => async( dispatch, getState) =>{
    dispatch(resetError());
    const displayError = (e) => {dispatch(showError(e))};
    const userState = getState().userReducer;

    await localStorage.saveUserData(userData);
    await FirebaseQuery.editUserData(userState.userId,userData,displayError);

        //TODO:
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


const actualLogin = (usrData,uid,glicemy) => async dispatch =>{

    //CHECK FOR EMPTY DATA:
    //usrData.age = 20; //TODO CALCULATE AGE FROM BIRTHDAY
    usrData.glicemy = glicemy;
    usrData.activitys = undefined;
    usrData.uid = uid;
    //CHECK FOR EMPTY DATA:
    //console.log(usrData.birthday);
    //usrData.birthday = new Date(); //TODO CALCULATE AGE FROM BIRTHDAY
    console.log("Login ok" + JSON.stringify(usrData));

    //SAVE DATA TO LOCAL STORAGE
    await localStorage.saveUserData(usrData);

    //REDUX DISPATCH
    dispatch({
        type: userMethods.login,
        payload: {
            usrData: usrData,
            userId:uid,
        }
    });
}
/**
 * retrive user data from firebase, check correctness of login
 * if login is ok save data to local storage and into redux state
 * @param {*} email id of user
 * @param {*} psw password for login
 * @returns true or false (false if login is not ok)
 */
export const login = (email,psw,errorFunc = (e) =>{}) => async dispatch =>{
    dispatch(resetError());
    //errorFunc([registrationErrors.invalidChoratio]);
    //console.count("counter");
    //ASYNC ACTION (eg check values on DB)

    //CHECK LOGIN DATA
    const user = await authSys.login(email,psw,errorFunc);
    if(user == null) {return null}; //BAD LOGIN (make return an error)
    //Get user data
    const usrData = (await FirebaseQuery.getUserData(user.uid));
    const glicemy = (await FirebaseQuery.getUserGlicemy(user.uid));


    dispatch(actualLogin(usrData,user.uid,glicemy));



    //LOAD OTHER USER DATA FROM FIREBASE (EG: MEAL DIARY)
    return true;
} 


export const googleLogin = (uid,errorFunc,navigation) => async dispatch =>{
    dispatch(resetError());
    const displayError = (e) => {dispatch(showError(e))};
    //Get user data
    const usrData = (await FirebaseQuery.getUserData(uid,displayError));
    const glicemy = (await FirebaseQuery.getUserGlicemy(uid,displayError));

    if(usrData == null){
        console.log("This google account isnt registered yet");
        //const error = [{title:"Not Registered",body:"Please register with this google account"}];
        //errorFunc(error);
        navigation.navigate('Registration',{mustCompleteReg:true,uid:uid});
        return false;
    }

    dispatch(actualLogin(usrData,uid,glicemy));

    navigation.navigate('Login',{});
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

    await localStorage.reset();

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



export const addGlicemy = (userId,glicemyValue) => async (dispatch,getState) =>{

    const date = new Date();

    //GET TIMESTAMP
    const glicemy = {value: glicemyValue,time:date};
    dispatch(resetError());
    const displayError = (e) => {dispatch(showError(e))};

    FirebaseQuery.addGlicemyValue(userId,glicemy,displayError);//TODO PUT AWAIT?
    localStorage.storeGlicemyData(glicemy,date);


    const formattedGlicemy = FirebaseQuery.changeGlicemyTimeFormat({...glicemy});

    //REDUX DISPATCH
    dispatch({
        type:userMethods.addGlicemy,
        payload:{glicemy:formattedGlicemy}
    })

    
    dispatch(saveState());

    
}

const saveState = () => async( dispatch, getState) =>{

    const userState = (getState()).userReducer;
    console.log("DEBUG: " + JSON.stringify(userState.userData));

    //localStorage.saveUserData(userState.userData);

}


