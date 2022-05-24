import React from 'react';
import { foodMethods, userMethods } from '../../src/constants/reducers';
import macroTracker, { initialState } from '../../src/stateManager/reduxStates/reducers/macroTracker';
import userReducer from '../../src/stateManager/reduxStates/reducers/userReducer';
import { dummyApple } from '../../testHelper/dataForTest/foods';

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
        Date.now = jest.fn(() => 1482363367071);
    });

    afterAll(()=>{
        Date.now = jest.fn(() => 1482363367071);
    });

    //ALL user Reducer test
    test("Login,Update,Glicemy,Logout",()=>{
        const userData = {name:"test",height:77,glicemy: []}
        const userId = "ABCDE123456";
        const action ={
            type:userMethods.login,
            payload:{
                usrData:userData,
                userId:userId
            }
        }

        let prevState; //State of previous operation
        //TRY LOGIN
        expect(prevState = userReducer(initialState,action)).toMatchSnapshot();
        
        //UPDATE USER
        const newUser = {...userData,name:"Pippo"}
        action.type = userMethods.updateUser;
        action.payload = {
            user:newUser
        }
        expect(prevState = userReducer(prevState,action)).toMatchSnapshot();
        
        //TRY ADD GLICEMY
        const glicemy = {value:43,time:{hours:"11:11",day:"22/1"}}
        action.type = userMethods.addGlicemy;
        action.payload = {
            glicemy:glicemy
        }
        expect(prevState = userReducer(prevState,action)).toMatchSnapshot();
        
        console.log(prevState);
        //LOGOUT
        action.type = userMethods.logout;
        expect(prevState = userReducer(prevState,action)).toMatchSnapshot();
    });


})