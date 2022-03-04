
import React,{ useState, createContext, useEffect } from 'react';
import * as localStorage from '../pages/utils/localStoreManager'

export const MealDataContext = createContext();


export const MealDataProvider = (props) =>{

    const [currentMealType,setMealType] = useState("breakfast");
    const [foods,setFoods] = useState({
        breakfast:[],
        lunch:[],
        dinner:[],
        snack:[]
    });


    return (
        <MealDataContext.Provider value = { [currentMealType,setMealType] }>
            {props.children}
        </MealDataContext.Provider>
    );
}//value = {{mealType: [currentMealType,setMealType] , foodList:[foods,setFoods]}}>
