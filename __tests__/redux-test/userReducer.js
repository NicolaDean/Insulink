import React from 'react';
import { foodMethods, userMethods } from '../../src/constants/reducers';
import userReducer, { initialState } from '../../src/stateManager/reduxStates/reducers/userReducer';

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
describe("TESTING THE REDUX REDUCER FOR USER:", ()=>{

    beforeAll(()=>{

    });

    afterAll(()=>{

    });

    state = initialState, action
    test("Add Food",()=>{
        const action ={
            type:foodMethods.addFood,
            payload:{
                
            }
        }
        userReducer(initialState,);
        
    });


})