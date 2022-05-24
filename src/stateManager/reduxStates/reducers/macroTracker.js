
import { macroConstants } from "../../../constants/states";
import { foodMethods } from "../../../constants/reducers"
import { FirebaseQuery } from "../../../utils/firebaseQuery";

const macro = macroConstants;

//TODO Each diary will have a Date, if Date < Today it will be saved localy/firabase and resetted for new day
export const initialDiaryState = {
    currentMeal:"breakfast",
    currentDate:FirebaseQuery.glicemyDateFormatter(new Date()),
    totMacro:{cal:0,carb:0,fat:0,prot:0},
    id:1,
    activity_id:1,
    meals:{
        breakfast:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        lunch:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        dinner:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
        snack:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}}
    },
    history:{
        empty:true,
        totMacro:{cal:0,carb:0,fat:0,prot:0},
        meals:{
            breakfast:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
            lunch:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
            dinner:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
            snack:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}}
        },
        activities:{
            breakfast:{sports:[],totCal:0},
            lunch:{sports:[],totCal:0},
            dinner:{sports:[],totCal:0},
            snack:{sports:[],totCal:0}
        }
    },
    totCalBurned:0,
    activities:{
        breakfast:{sports:[],totCal:0},
        lunch:{sports:[],totCal:0},
        dinner:{sports:[],totCal:0},
        snack:{sports:[],totCal:0}
    }
}

/**
 * Select current meal to assign added food to
 * @param {*} state 
 * @param {*} data 
 * @returns 
 */
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

    console.log("ADDING THIS MACRO: " + base[macro.cal] +  " + " + toSum[macro.cal] +"=" +  result[macro.cal]);
   
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

    console.log("REMOVING THIS MACRO: " + base[macro.cal] +  " - " + toRemove[macro.cal] +"=" +  result[macro.cal]);
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
    food.identifier = newstate.id;
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

const addActivity = (state,data) =>{
    const activity = data.activity;

    //COPY STATE
    const newstate ={...state};
    activity.identifier = newstate.activity_id;
    newstate.activity_id = newstate.activity_id+1;
    //
    newstate.activities[newstate.currentMeal].sports.push(activity);
    newstate.activities[newstate.currentMeal].totCal += activity.calories;
    newstate.totCalBurned += activity.calories;

    return newstate;
}



const findMatchingIdMeal = (array,identifier,isSport = false) =>{

    console.log("Identifier: " + identifier)
    //REMOVING FOOD FROM LIST:
    let found = false;
    let m_found = false;

    let meal_types = Object.keys(array);

    //FOR EACH MEAL
    meal_types.forEach((key,index) =>{
        if(found != false){ return;}
            let i = 0;
            let tmp = [];
            if(isSport) {
                tmp =array[key].sports;
            }else{
                tmp =array[key].foods;
            }
            
    
            //FOR EACH FOOD
            tmp.forEach(x =>{
                //CHECK IDENTIFIER TO REMOVE
                console.log("(" + x.identifier + " , " + identifier+ ")");
            
                if(x.identifier === identifier)
                {
                    //IF FOUNDED MARK INDEX AND MEAL FROM WICH REMOVE
                    found = i;
                    m_found = key;
                }
                i++;
            });        
        });

        return {index:found,meal:m_found};
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
   
    console.log("FOOOD: " + JSON.stringify(food));

    //FIND MATCHING FOOD IN STATE
    let matching = findMatchingIdMeal(newstate.meals,food.identifier,false);

    //REMOVE FROM MEAL THE FOOD AT THE SPECIFIC INDEX MARKED
    if((matching.index-1 === -1) || matching.index != false){
        console.log("REMOVING: " + JSON.stringify(food));

        //REMOVING MACRO
        let m = state.meals[matching.meal].macro;
        newstate.meals[matching.meal].macro = subMacro(m,food);
        newstate.totMacro  = subMacro(newstate.totMacro,food);

        //REMOVING FOOD FROM LIST
        newstate.meals[matching.meal].foods.splice(matching.index,1);
        
    }
    

    return newstate;
}

const editFood = (state,data) =>{
    const food = data.food;
    //COPY STATE
    const newstate ={...state};
   
    //FIND MATCHING FOOD IN STATE
    let matching = findMatchingIdMeal(newstate.meals,food.identifier,false);


    //REMOVE FROM MEAL THE FOOD AT THE SPECIFIC INDEX MARKED
    if((matching.index-1 === -1) || matching.index != false){
        console.log("FOUND IN (" +matching.meal + ","+matching.index+")" );
        //PROBLEM IS IN IDENTIFIER!!
        let m = newstate.meals[matching.meal].macro;
        console.log(JSON.stringify(newstate));
        let oldFood = newstate.meals[matching.meal].foods[matching.index];

        //REMOVE FOOD FROM MACRO
        //(BISOGNA PASSARE IL CIBO VERO E PROPRIO MO VIENE PASSATO L'ID)
        //Remove old version Macro
        newstate.meals[matching.meal].macro = subMacro(m,oldFood);
        newstate.totMacro  = subMacro(newstate.totMacro,oldFood);

        //Add new Version Macro
        newstate.meals[matching.meal].macro = sumMacro(newstate.meals[matching.meal].macro,food);
        newstate.totMacro  = sumMacro(newstate.totMacro,food);

        newstate.meals[matching.meal].foods[matching.index] = food;
    }
    

    return newstate;
}

const removeActivity = (state,data) =>{
    //COPY STATE
    const newstate ={...state};
    const activity = data.activity;


    //FIND MATCHING ACTIVITY IN STATE
    let matching = findMatchingIdMeal(newstate.activities,activity.identifier,true);


    if((matching.index-1 === -1) || matching.index != false){
        //TODO REMOVE CALORIES
        newstate.activities[matching.meal].totCal -= activity.calories;
        newstate.totCalBurned -= activity.calories;
        //REMOVING FOOD FROM LIST
        newstate.activities[matching.meal].sports.splice(matching.index,1);
    }
    //TODO REMOVE ACTIVITY
    return newstate;
}
/**
 * Load Meals data from memory
 * @param {*} state 
 * @param {*} payload 
 * @returns 
 */
const loadMeals = (state,payload) =>{
    return payload.diary;
}

/**
 * reset the diary for a new day
 * @param {*} state 
 * @param {*} payload 
 * @returns 
 */
const resetDiary = (state,payload) =>{

    const newState = {...initialDiaryState};

    console.log("UFF: " + JSON.stringify(newState))

    newState.currentDate = payload.currentDate;

    return newState;
}

const loadHistory = (state,payload) => {
    const newState = {...state};

    newState.currentDate = payload.date;
    if(payload.date != FirebaseQuery.glicemyDateFormatter()){
        if(payload.history!=null){
            newState.history = payload.history;
        }
    }
    
    return newState;
}

//TODO PUT THE NAME OF ACTIONS INTO COSNTANT FILE
const macroReducer = (state = initialDiaryState, action) => {
    switch(action.type){
        case foodMethods.addFood:
            return addFood(state,action.payload);
        case foodMethods.removeFood:
            return removeFood(state,action.payload);
        case foodMethods.editFood:
            return editFood(state,action.payload);
        case foodMethods.selectMeal:
            return selectMeal(state,action.payload);
        case foodMethods.loadFoodDiary:
            return loadMeals(state,action.payload);
        case foodMethods.addActivity:
            return addActivity(state,action.payload);
        case foodMethods.resetDiary:
            return resetDiary(state,action.payload);
        case foodMethods.removeActivity:
            return removeActivity(state,action.payload);
        case foodMethods.loadHistory:
            return loadHistory(state,action.payload);
        default:
            return state;
        }
}

export default macroReducer;