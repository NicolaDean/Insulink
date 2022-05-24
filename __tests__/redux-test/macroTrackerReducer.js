import React from 'react';
import { foodMethods, userMethods } from '../../src/constants/reducers';
import macroTracker, { initialDiaryState } from '../../src/stateManager/reduxStates/reducers/macroTracker';
import { dummyApple } from '../../testHelper/dataForTest/foods';

const initState = {...initialDiaryState,currentDate:"[TODAY DATE]" };

const food_test={
    id:     dummyApple,
    name:   "apple",
    image:  "[IMAGE]",
    cal:    90 ,
    carb:   33,
    fat:    55,
    prot:   22,
    quantity: 1,
    unit: 'g',
    identifier: 1,
}

const food_test2={
    id:     dummyApple,
    name:   "apple",
    image:  "[IMAGE]",
    cal:    180 ,
    carb:   55,
    fat:    33,
    prot:   77,
    quantity: 2,
    unit: 'g',
    identifier: 1,
}

let dummy_sport = {
    name:"Nome",
    calories:400,
    duration:50,
    photo:"[IMAGE]",
    identifier:1
}

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}

jest.mock("@react-native-firebase/firestore", () => fir);


/**
 * Those test allow to check if the reducer change correctly the global state after an action
 */

describe("TESTING THE REDUX REDUCER FOR MACRO:", ()=>{


    beforeAll(()=>{

    });

    afterAll(()=>{

    });


    test("Add,Edit,Remove Food",()=>{
        console.log(initState);
        const action ={
            type:foodMethods.addFood,
            payload:{
                food:food_test
            }
        }
        let prevState; //State of previous operation
        //TRY ADDING A FOOD
        expect(prevState = macroTracker(initState,action)).toMatchSnapshot();

        //EDITING THE FOOD
        action.type = foodMethods.editFood;
        action.payload = {food:food_test2};
        expect(prevState = macroTracker(prevState,action)).toMatchSnapshot();

        //REMOVING THE FOOD
        action.type = foodMethods.removeFood;
        expect(macroTracker(prevState,action)).toMatchSnapshot();
    });

    test("Add,Remove  Sport",()=>{
        const action ={
            type:foodMethods.addActivity,
            payload:{
                activity:dummy_sport
            }
        }
        let prevState; //State of previous operation
        //TRY ADDING A SPORT
        expect(prevState = macroTracker(initState,action)).toMatchSnapshot(
            {
                currentDate: expect.any(String),
            }      
        );

        //TRY REMOVING A SPORT
        action.type = foodMethods.removeActivity;
        expect(prevState = macroTracker(prevState,action)).toMatchSnapshot()
    });


    test("Select Meal",()=>{

    });

    test("Reset Diary",()=>{
        const action ={
            type:foodMethods.addActivity,
            payload:{
                activity:dummy_sport
            }
        }

        const prevState = macroTracker(initState,action);

        action.type = foodMethods.resetDiary;
        expect(macroTracker(prevState,action)).toMatchSnapshot()
    
    });

})