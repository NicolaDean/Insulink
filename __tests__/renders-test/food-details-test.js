import React from "react";
//import {cleanup, fireEvent, render} from '@testing-library/react';
import {create,act} from 'react-test-renderer';
import * as actions from "../../src/stateManager/reduxStates/actions/macroTracker";
import { dummyApple, dummyAppleDeletable } from "../../testHelper/dataForTest/foods";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { Provider } from "react-redux";
import { mockedStore } from "../../testHelper/reduxMock";
import { FoodDetails } from "../../src/pages/foodSearch/foodDetails";

import * as rdx from 'react-redux';
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { Food_API } from "../../src/utils/apiQuery";
import { foodDetails as dummyDetails } from "../../src/utils/testingJsons";
import {useDispatch} from 'react-redux';


jest.useFakeTimers();//TO USE useEffects and other async requests

//MOCK DISPATCH
//const mockDispatch = jest.fn((action) =>{ const dispatch = useDispatch();console.log(action);dispatch(action())});
const mockDispatch = jest.spyOn(rdx,'useDispatch');
//m.mockImplementation (()=>mockDispatch);

//AXIOS MOCK
let mock_axios;
jest.mock('axios',() => mock_axios = jest.fn(async(config) =>{
    console.log("CONFIGg:" + JSON.stringify(config));
    return await(new Promise((resolve,reject)=>resolve())); //THIS ALLOW TO FAKE THE REQUEST
}));

//MOCK OUR API
const api_mock = jest.spyOn(Food_API,'getIngredientDetailsAlternative');
api_mock.mockImplementation(async (a) => {
        console.log("API CALLED with " + a); 
        return new Promise((resolve,reject)=>{
                console.log("Start API");
                resolve(dummyDetails)
            })
        });

//FIREBASE MOCK
const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;
FirebaseQuery.glicemyDateFormatter = (d) => {return "[DATE]"}
  const firebasee = () =>{
      return {
          collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
          doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
      };
  }
  
jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('invariant/invariant');

//MOCK NAVIGATION
const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

//TEST FOOD
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

//DECLARE TREE VARIABLE
const params = {data : dummyApple,foodInfo:dummyAppleDeletable,editable : false};
let tree;

  
describe("TEST ON Food Details Page:",()=>{

    
    beforeAll(async ()=>{
        await act(async() => {
            tree = create(<Provider store={mockedStore}>
                            <FoodDetails route={{params:params}} navigation={mock_navigation} currentDate="[DATE]"/>
                          </Provider>)
          });
    })

    /**
     * Semplicemente snapshot
     */
    test("Food Details SnapShot: ",async()=>{
        
        expect(tree).toMatchSnapshot();
    });

    test("Initialization",async () =>{


        //Check API is called correctly
        expect(api_mock).toBeCalled(); //OK
        expect(api_mock).toBeCalledWith("apple pie");

        //Check all variables have been  setted correctly
        /*expect(setStateMock).toBeCalledTimes(4);
        expect(setStateMock).toHaveBeenNthCalledWith(1,1);      //setAmount
        expect(setStateMock).toHaveBeenNthCalledWith(2,"cup");  //chosen Unit  
        expect(setStateMock.mock.calls[3]).toMatchSnapshot();   //setUnits
        expect(setStateMock.mock.calls[4]).toMatchSnapshot();   //setDetails*/
    })
    /**
     * Test if clicking add food with no selected quantity/unit give error
     */
    test("Test Error of  Add Food with No Parameter", () =>{
       const addBtn = tree.root.findByProps({testID:'AddButtonID'}).props;
        //Click Button
        act(()=>addBtn.onPress());
        //Check if dispatch is called correctly
        expect(mockDispatch).toBeCalled();
        //Check changed state
        expect(mockedStore.getState()).toMatchSnapshot();
        //Check Navigation
        expect(mock_navigation.navigate).toBeCalledWith("MealDiary",{});
    });

    /**
     * Test Clicking Add Food redirect to FoodSearch
     */
    test("Test Delete Food",async () => { 

        let editTree;
        await act(async() => {
            editTree = create(<Provider store={mockedStore}>
                                <FoodDetails route={{params:params}} navigation={mock_navigation} currentDate="[NotToday]"/>
                              </Provider>)
          });

        //Click Button

        //Check dispatch

        //Check changed state

        //Check navigation
    })

    /**
     * Check if the edit button
     */
    test("Test Edit Food", async () =>{
        let editTree;
        await act(async() => {
            editTree = create(<Provider store={mockedStore}>
                            <FoodDetails route={{params:params}} navigation={mock_navigation} currentDate="[NotToday]"/>
                          </Provider>)
          });
        
          const addBtn = editTree.root.findByProps({testID:'AddButtonID'}).props;
        //Click Button
        act(()=>addBtn.onPress());
        //Check if dispatch is called correctly
        expect(mockDispatch).toBeCalled();
        //Check changed state
        expect(mockedStore.getState()).toMatchSnapshot();
        //Check Navigation
        expect(mock_navigation.navigate).toBeCalledWith("MealDiary",{});
    });
});