import { foodMethods } from "../../../constants/reducers"

export const addFood = (food) =>{
    return{
        type: foodMethods.addFood,
        payload: {food:food}
    }
} 

export const removeFood = (food) =>{
    return{
        type: foodMethods.removeFood,
        payload: {food:food}
    }
} 

export const selectMealType = (mealType) =>{
    return{
        type: foodMethods.selectMeal,
        payload: {mealType:mealType}
    }
}