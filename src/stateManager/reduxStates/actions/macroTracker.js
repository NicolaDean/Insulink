import { foodMethods } from "../../../constants/reducers"
import { FirebaseQuery } from "../../../utils/firebaseQuery";

import { localStorage } from "../../../utils/localStoreManager";

export const addFood = (food,currentMeal) => async( dispatch, getState) =>{

    let today = FirebaseQuery.glicemyDateFormatter();
    
    dispatch({
        type: foodMethods.addFood,
        payload: {food:food}
    })

    //TODO ADD TO FIREBASE

    //Update LOCAL STORAGE
    const state = getState();
    localStorage.storeFoodDiary(FirebaseQuery.glicemyDateFormatter(),state.macroTracker);

    //THINK HOW MANTAIN CONSINSTENCY
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

export const loadRemoteDiary = (email,date) =>{ b
    
}

export const addActivityToDiary = (activity) => async( dispatch, getState) =>{

    console.log("ADD ACTIVITY");
    dispatch({
        type: foodMethods.addActivity,
        payload: {activity:activity}
    });

    //Update LOCAL STORAGE
    const state = getState();
    localStorage.storeFoodDiary(glicemyDateFormatter(),state.macroTracker);
}