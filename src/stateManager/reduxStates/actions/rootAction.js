import { loginStatus } from "../../../constants/states";


import * as database from "../../../utils/firebaseQuery"
import * as localStorage from '../../../utils/localStoreManager'

export const checkStateConsistency = (login,nav) => async dispatch =>{

    //CHECK IF LOCAL DATA ARE AVAILABLE

    localStorage
    //CHECK IF
    if( login == loginStatus.unlogged){
        nav.navigate('Login',{});
    }
        
    //CHECK IF USER IS LOGGED:
        //CHECK IF LOCAL STORAGE HAS DATA
            //...
    //ELSE REDIRECT TO LOGIN PAGE
   
    const userData = {};
    const diaryData = {};

    console.log("HOME LOADED!!");
    //IF NOT DATA AVAILABLE CALL DISPATCH FUNCTION TO SAVE LOADED STATE
   /* dispatch({
        type: 'CHECK_CONSISTENCY',
        payload: {userData:userData,diaryData:diaryData},
    });*/
}