
export const addFood = (food) =>{
    return{
        type: 'ADD_FOOD',
        payload: {food:food}
    }
} 

export const removeFood = (food) =>{
    return{
        type: 'REMOVE_FOOD',
        payload: {food:food}
    }
} 

export const selectMealType = (mealType) =>{
    return{
        type: 'SELECT_MEAL',
        payload: {mealType:mealType}
    }
}