
import React,{ useState, createContext, useEffect } from 'react';
import * as localStorage from './../utils/localStoreManager'

export const MealDataContext = createContext();


export const MealDataProvider = (props) =>{

    const [currentMealType,setMealType] = useState("");
    /*const [foods,setFoods] = useState({
        breakfast:[],
        lunch:[],
        dinner:[],
        snack:[]
    });*/

    const [foods,setFoods] = useState([]);
    return (
        <MealDataContext.Provider value = {{mealType: [currentMealType,setMealType] , foodList:[foods,setFoods]}}>
            {props.children}
        </MealDataContext.Provider>
    );
}//value = {{mealType: [currentMealType,setMealType] , foodList:[foods,setFoods]}}>
