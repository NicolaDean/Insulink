import { loginStatus } from "../../../constants/states";

export const checkStateConsistency = (login,nav) => async dispatch =>{

    if( login == loginStatus.unlogged){
        nav.navigate('Login',{});
    }
        
    //CHECK IF USER IS LOGGED:

        //CHECK IF LOCAL STORAGE HAS DATA
            //...
        //CHECK IF FIREBASE HAS DATA
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