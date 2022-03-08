
const initialState = {
    currentMeal:"breakfast",
    totMacro:{cal:0,carb:0,fat:0,prot:0},
    meals:{
        breakfast:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        lunch:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        dinner:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        snack:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}}
    } 
}

const selectMeal = (state,data)=>{
    const newState = {
        ...state,
        currentMeal: data.mealType}

    console.log("Current Meal:" + state.currentMeal);
    return newState;
}

const addFood = (state,data)=>{
    
    const newstate ={...state};
    newstate.meals[state.currentMeal].foods.push(data.food);
    let macro = state.meals[state.currentMeal].macro;

    newstate.totMacro['carb'] = newstate.totMacro['carb'] + data.food['carbs'];
    newstate.totMacro['prot'] = newstate.totMacro['prot'] + data.food['prot'];
    newstate.totMacro['fat'] = newstate.totMacro['fat'] + data.food['fat'];
    newstate.totMacro['cal'] = newstate.totMacro['cal'] + data.food['cal'];
    
    macro['cal'] = macro['cal'] + data.food['cal'];
    macro['carb'] = macro['carb'] + data.food['carbs'];
    macro['prot'] =   macro['carb'] + data.food['prot'];
    macro['fat'] =  macro['carb'] +data.food['fat'];

    newstate.meals[state.currentMeal].macro = macro;

    //console.log("STATE CHANGE: " + JSON.stringify(newstate));
    //TODO PUT FOOD INTO STATE
    return newstate;
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