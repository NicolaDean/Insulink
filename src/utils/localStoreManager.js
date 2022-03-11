import AsyncStorage from '@react-native-async-storage/async-storage';


//PERSONAL DATA MANAGMENT

export const getEmptyUser = () =>{
  var userJson = {
    weight: 60,
    height: 12,
    age: 3,
    name: "pagliaccio",
    ISF: 0,
    CHORatio: 0
  }; 

  return userJson;
}

export const getUserData = async () =>{
    var data = await getData("userData");
    console.log("User data: " +  JSON.stringify(data));
    if (data!=null){
      return data;
    }
    else return getEmptyUser();
}

export const saveUserData = (userData) =>{
    console.log("Saving user data: " + JSON.stringify(userData));
    storeData("userData",userData);
}


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