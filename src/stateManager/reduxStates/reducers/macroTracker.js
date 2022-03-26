
import { macroConstants } from "../../../constants/states";
import { foodMethods } from "../../../constants/reducers"

const macro = macroConstants;

//TODO Each diary will have a Date, if Date < Today it will be saved localy/firabase and resetted for new day
const initialState = {
    currentMeal:"breakfast",
    currentDate:{},
    totMacro:{cal:0,carb:0,fat:0,prot:0},
    id:1,
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

/**
 * Merge 2 macro into a single one by summing its values
 * @param {*} base first macro
 * @param {*} toSum second macro
 * @returns merged macros
 */
const sumMacro = (base,toSum) =>{

    let result = {};

    result[macro.cal] = base[macro.cal] + toSum[macro.cal];
    result[macro.fat] = base[macro.fat] + toSum[macro.fat];
    result[macro.carb] = base[macro.carb] + toSum[macro.carb];
    result[macro.prot] = base[macro.prot] + toSum[macro.prot];

    return result;
}
/**
 * Merge 2 macro into a single one by subbing its values
 * @param {*} base first macro
 * @param {*} toSum second macro
 * @returns merged macros
 */
const subMacro = (base,toRemove) =>{

    let result = {};

    result[macro.cal] = base[macro.cal] - toRemove[macro.cal];
    result[macro.fat] = base[macro.fat] - toRemove[macro.fat];
    result[macro.carb] = base[macro.carb] - toRemove[macro.carb];
    result[macro.prot] = base[macro.prot] - toRemove[macro.prot];

    return result;
}

/**
 * add a food to the global state representing meals of today
 * @param {*} state today meals
 * @param {*} data food to add
 * @returns new state with the new food added to the current selected meal
 */
const addFood = (state,data)=>{
    
    const food = data.food;
    //COPY STATE
    const newstate ={...state};
    //INCREMENT ID
    newstate.id = newstate.id + 1;
    //PUSH FOOD
    newstate.meals[state.currentMeal].foods.push(data.food);
    //CALCULATE TOT MACRO
    let m = state.meals[state.currentMeal].macro;
    newstate.totMacro  = sumMacro(newstate.totMacro,data.food);
    newstate.meals[state.currentMeal].macro = sumMacro(m,data.food);

    return newstate;
}
/**
 * remove a food to the global state representing meals of today
 * @param {*} state today meals
 * @param {*} data food to add
 * @returns new state with the selected food removed to the current selected meal
 */
const removeFood = (state,data)=>{

    const food = data.food;
    //COPY STATE
    const newstate ={...state};
    let m = state.meals[state.currentMeal].macro;

    //REMOVE FOOD FROM MACRO
    //(BISOGNA PASSARE IL CIBO VERO E PROPRIO MO VIENE PASSATO L'ID)
    newstate.meals[state.currentMeal].macro = subMacro(m,food);
    newstate.totMacro  = subMacro(newstate.totMacro,food);

    //REMOVING FOOD FROM LIST:
    let found = false;
    let m_found = false;

    let meal_types = Object.keys(newstate.meals);

    //FOR EACH MEAL
    meal_types.forEach((key,index) =>{
        if(found != false){ return;}
        let i = 0;
        let tmp = [];
        tmp =newstate.meals[key].foods;

        //FOR EACH FOOD
        tmp.forEach(x =>{
            //CHECK IDENTIFIER TO REMOVE
            if(x.identifier === food.identifier)
            {
                //IF FOUNDED MARK INDEX AND MEAL FROM WICH REMOVE
                found = i;
                m_found = key;
            }
            i++;
        });        
    });

    console.log("F: " + found);
    //REMOVE FROM MEAL THE FOOD AT THE SPECIFIC INDEX MARKED
    if((found-1 === -1) || found != false){
        console.log("removing " + found + " element from " + m_found);
        newstate.meals[m_found].foods.splice(found,1);
    }

    console.log("Updated state: " + JSON.stringify(newstate));
    

    return newstate;
}

//TODO PUT THE NAME OF ACTIONS INTO COSNTANT FILE
const macroReducer = (state = initialState, action) => {
    switch(action.type){
        case foodMethods.addFood:
            return addFood(state,action.payload);
        case foodMethods.removeFood:
            return removeFood(state,action.payload);
        case foodMethods.selectMeal:
            return selectMeal(state,action.payload);
        default:
            return state;
        }
}

export default macroReducer;