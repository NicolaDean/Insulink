import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../constants/localStorageKeys';
import { loginStatus } from '../constants/states';
import { initialDiaryState } from '../stateManager/reduxStates/reducers/macroTracker';
import { changeGlicemyTimeFormat, glicemyDateFormatter } from './firebaseQuery';


const dummy_user = {
  weight: 60,
  height: 12,
  age: 3,
  name: "nome",
  ISF: 0,
  CHORatio: 0
}; 

//PERSONAL DATA MANAGMENT
//----------------------------------------------------
//------------USER DATA ACCESS------------------------
//----------------------------------------------------

export const getUserData = async () =>{
    var data = await getData("userData");
    //console.log("User data: " +  JSON.stringify(data));
    if (data!=null){
      return data;
    }
    else return dummy_user;
}

/**
 * save user personal data to local storage
 * @param {*} userData data to save
 */
export const saveUserData = async (userData) =>{
    await storeData(storageKeys.userData,userData);
}

/**
 * Store true or false according to availability or not of data
 * This allow to easily check if data are available or not
 * @param {*} status presence of data 
 */
export const setDataAvailability = async (status) =>{
  await storeData(storageKeys.dataAvailability,status);
}

/**
 * check for data availability without loading all data
 * @returns true if data are available
 */
export const checkDataAvailability = async () =>{
  return (await getData(storageKeys.dataAvailability));
}

/**
 * cancel user data from localstorage
 */
export const resetUser = async () =>{
    AsyncStorage.removeItem(storageKeys.userData);
    AsyncStorage.removeItem(storageKeys.foodDiary);
    setDataAvailability(false);
}

//----------------------------------------------------
//------------STORE ACCESS METHODS--------------------
//----------------------------------------------------
/**
 * store JSON object to local storage
 * @param {*} value  object to insert
 * @param {*} key key to identify
 */
const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

/**
 * get JSON object from local storage
 * @param {*} key identifier of JSON
 * @returns 
 */
const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

const keys = {
  glicemy: "glicemy_",
  userData: "userData",
  foodDiary: "food_diary_"
}

  class LocalStorage {

    constructor(){}

    /**
     * Save into local Storage new glicemy value
     * @param {*} new_glicemy 
     */
    storeGlicemyData = async (new_glicemy,date=new Date()) =>{

      const today = keys.glicemy + glicemyDateFormatter(date);
      let updatedValue = {...new_glicemy};
      console.log(date);
      updatedValue = changeGlicemyTimeFormat(updatedValue,true);

      console.log("CHANGED GLICEMY LOCAL: " + JSON.stringify(updatedValue));
      //CHANGE DATE FORMAT FOR LOCAL GLICEMY
      let currentValues = await getData(today);

      if(currentValues == null) currentValues = [];

      currentValues.push(updatedValue);

      await storeData(today,currentValues);

      console.log(currentValues)
    }

    /**
     * get Glicemy Data of a specific date
     */
    getGlicemyData = async (date) =>{
      const today = keys.glicemy + glicemyDateFormatter(date);

      const glicemy = await getData(today);

      return glicemy;
    }

    /**
     * get user Data from local storage
     * @returns 
     */
    getUserData = async () => {

      const glicemy = await this.getGlicemyData(new Date());
      let userData = await getData(storageKeys.userData);
      
      const today = glicemyDateFormatter(new Date());
      if(userData != null){
        userData.glicemy[today] = glicemy;
      }else{
        userData = null;//dummy_user?
      } 

      //console.log("User data: " +  JSON.stringify(userData));
      return userData;
    }

    /**
     * save user data to local storage
     * @param {*} userData 
     */
    saveUserData = async (userData) =>{
      await storeData(storageKeys.userData,userData);
    }

    /**
     * Logout of user, remove all his data from local Storage
     */
    resetUser = async () =>{
      AsyncStorage.removeItem(storageKeys.userData);
      AsyncStorage.removeItem(storageKeys.foodDiary);
      setDataAvailability(false);
    }

    loadFoodDiary = async (date) =>{
        let key = keys.foodDiary + date;

        const data = await getData(key);

        return data;
    }

    storeFoodDiary = async (date,data) => {
      let key = keys.foodDiary + date;
      await storeData(key,data);
      console.log("Diary Stored on Local Storage");
    }

  }

  export const localStorage = new LocalStorage()