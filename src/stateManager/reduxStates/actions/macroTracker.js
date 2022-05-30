import { foodMethods } from "../../../constants/reducers"
import { FirebaseQuery } from "../../../utils/firebaseQuery";

import { localStorage } from "../../../utils/localStoreManager";
import { initialDiaryState } from "../reducers/macroTracker";
import { showError } from "./errorAction";


const saveState = () => async( dispatch, getState) =>{

    let today = FirebaseQuery.glicemyDateFormatter();

    //Get updated state
    const state = getState();
    //Update LOCAL STORAGE
    localStorage.storeFoodDiary(today,state.macroTracker);
    //Update  FIREBASE
    const displayError = (e) => {dispatch(showError(e))};
    console.log(JSON.stringify(state.userReducer));
    console.log(state.userReducer.userId + " -> " + today)
    FirebaseQuery.saveFoodDiary(state.userReducer.userId,today,state.macroTracker,displayError);
    //TODO THINK HOW MANTAIN CONSINSTENCY
}

export const addFood = (food,currentMeal) => async( dispatch, getState) =>{

    dispatch({
        type: foodMethods.addFood,
        payload: {food:food}
    })

    dispatch(saveState());
} 

export const removeFood = (food) => async( dispatch, getState) =>{
    dispatch({
        type: foodMethods.removeFood,
        payload: {food:food}
    })
    dispatch(saveState());
} 

export const removeActivity = (activity) => async( dispatch, getState) =>{
    dispatch({
        type: foodMethods.removeActivity,
        payload: {activity:activity}
    })
    dispatch(saveState());
} 
export const editFood = (food) => async( dispatch, getState) =>{
    dispatch({
        type: foodMethods.editFood,
        payload: {food:food}
    })
    dispatch(saveState());
} 

export const selectMealType = (mealType) =>{
    return{
        type: foodMethods.selectMeal,
        payload: {mealType:mealType}
    }
}


export const loadHistory = (date) => async( dispatch,getState) =>{

     //Get updated state
     const state = getState();
     let history = null;
     if(date == FirebaseQuery.glicemyDateFormatter()) 
     {
         console.log("RETURNED TO TODAY: ");
     }else{
        console.log("LOAD HISTORY FROM : " + date + " -> " + state.userReducer.userId);
        //Try LOADING FROM LOCAL STORAGE
        history = await localStorage.loadFoodDiary(date);
    
        const displayError = (e) => {dispatch(showError(e))};

        //IF NULL Try LOADING FROM FIREBASE
        if(history == null){
            //Load from firebase
            console.log("load from firebase")
            history = await  FirebaseQuery.getFoodDiary(state.userReducer.userId,date,displayError);
            console.log("HISTORY: -> " + JSON.stringify(history));
        }
    
        if(history == null){
            history = initialDiaryState.history;
        }
     }
   
    
    dispatch({
        type: foodMethods.loadHistory,
        payload: {date:date,history:history}
    })
}

export const addActivityToDiary = (activity) => async( dispatch, getState) =>{

    console.log("ADD ACTIVITY");
    console.log(JSON.stringify(activity));
    dispatch({
        type: foodMethods.addActivity,
        payload: {activity:activity}
    });

    dispatch(saveState());
}