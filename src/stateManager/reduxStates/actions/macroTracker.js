import { foodMethods } from "../../../constants/reducers"
import { FirebaseQuery } from "../../../utils/firebaseQuery";

import { localStorage } from "../../../utils/localStoreManager";

export const addFood = (food,currentMeal) => async( dispatch, getState) =>{

    let today = FirebaseQuery.glicemyDateFormatter();
    
    dispatch({
        type: foodMethods.addFood,
        payload: {food:food}
    })

    //Get updated state
    const state = getState();
    //Update LOCAL STORAGE
    localStorage.storeFoodDiary(today,state.macroTracker);
    //Update  FIREBASE

    console.log(JSON.stringify(state.userReducer));
    FirebaseQuery.saveFoodDiary(state.userReducer.userId,today,state.macroTracker);
    //TODO THINK HOW MANTAIN CONSINSTENCY
} 

export const removeFood = (food) =>{
    return{
        type: foodMethods.removeFood,
        payload: {food:food}
    }
} 

export const editFood = (food) =>{
    return{
        type: foodMethods.editFood,
        payload: {food:food}
    }
} 

export const selectMealType = (mealType) =>{
    return{
        type: foodMethods.selectMeal,
        payload: {mealType:mealType}
    }
}

export const loadRemoteDiary = (email,date) =>{ 
    
}

export const loadHistory = (date) => async( dispatch,getState) =>{

     //Get updated state
     const state = getState();

     console.log("LOAD HISTORY FROM : " + date + " -> " + state.userReducer.userId);
    //Try LOADING FROM LOCAL STORAGE
    let history = await localStorage.loadFoodDiary(date);

    //console.log("HISTORY: " + JSON.stringify(history));

    //IF NULL Try LOADING FROM FIREBASE
    if(history == null){
        //Load from firebase
        console.log("load from firebase")
        history = await  FirebaseQuery.getFoodDiary(state.userReducer.userId,date);
        console.log("HISTORY: -> " + JSON.stringify(history));
    }

    dispatch({
        type: foodMethods.loadHistory,
        payload: {date:date,history:history}
    })
}

export const addActivityToDiary = (activity) => async( dispatch, getState) =>{

    console.log("ADD ACTIVITY");
    dispatch({
        type: foodMethods.addActivity,
        payload: {activity:activity}
    });

    //Update LOCAL STORAGE
    const state = getState();
    localStorage.storeFoodDiary(FirebaseQuery.glicemyDateFormatter(),state.macroTracker);
}