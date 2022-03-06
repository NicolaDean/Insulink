
const initialState = {
    currentMeal:"breakfast",
    meals:{
        breakfast:[],
        lunch:[],
        dinner:[],
        snack:[]
    } 
}

const selectMeal = (state,data)=>{
    state.currentMeal = data.mealType;

    console.log("Current Meal:" + state.currentMeal);
    return state;
}

const addFood = (state,data)=>{
    
    state.meals[state.currentMeal].push(data.food);

    console.log("STATE CHANGE: " + JSON.stringify(state));
    //TODO PUT FOOD INTO STATE
    return state;
}

const removeFood = (state,data)=>{

}

//TODO PUT THE NAME OF ACTIONS INTO COSNTANT FILE
const macroReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_FOOD':
            return addFood(state,action.payload);
        case 'REMOVE_FOOD':
            return removeFood(state,action.payload);
        case 'SELECT_MEAL':
            return selectMeal(state,action.payload);
        default:
            return state;
        }
}

export default macroReducer;