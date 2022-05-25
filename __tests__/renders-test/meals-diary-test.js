import React from "react";
//import {cleanup, fireEvent, render} from '@testing-library/react';
import {create,act} from 'react-test-renderer';
import { MealDiary } from "../../src/pages/diary/mealDiary";
import * as actions from "../../src/stateManager/reduxStates/actions/macroTracker";
import { initialDiaryState } from "../../src/stateManager/reduxStates/reducers/macroTracker";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { dummyApple, dummyAppleDeletable } from "../../testHelper/dataForTest/foods";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { Provider } from "react-redux";
import { mockedStore } from "../../testHelper/reduxMock";


import * as rdx from 'react-redux';
import { Food_API } from "../../src/utils/apiQuery";

const mockDispatch = jest.fn((action) => console.log(action));
const m = jest.spyOn(rdx,'useDispatch');
m.mockImplementation (()=>mockDispatch);


const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;


  const firebasee = () =>{
      return {
          collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
          doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
      };
  }
  
//MOCK FIERBASE AND REDUX

jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('invariant/invariant');
jest.mock('@react-native-async-storage/async-storage');
//MOCK NON USEFUL UI COMPONENTS
jest.mock('react-native-slick');

jest.mock('victory-native');
//jest.mock('../../src/pages/diary/meal',()=>"MEAL");

const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

const params = {
    openCalendar:false
}
const tree = create(
    <Provider store={mockedStore}>
        <MealDiary navigation={mock_navigation} diary={initialDiaryState} route={{params:params}}/>
    </Provider>
);

describe("TEST ON FOOD COMPONENT MEAL AND MEAL DIARY:",()=>{

    /**
     * Semplicemente snapshot
     */
    test("Food SnapShot: ",()=>{
        
        expect(tree).toMatchSnapshot();
    });

    /**
     * Test if on Meal Expand on click
     */
    test("Test Meal Expansion", () =>{
        const mealClick = tree.root.findAllByProps({testID:'MealID'})[0].props;
        
        //console.log(mealClick);

        act(()=>mealClick.onPress());

        expect(tree).toMatchSnapshot();
    });

    /**
     * Test Clicking Add Food redirect to FoodSearch
     */
    test("Test Add Food", () => { 
        //GET THE ADD FOOD BUTTON
        const mealClick = tree.root.findByProps({id:'breakfast'}).findByProps({testID:'AddFoodID'}).props;
        //Click button
        act(()=>mealClick.onPress());
        //Check Consequences
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_MEAL', payload: { mealType: 'breakfast' } });
        expect(mock_navigation.navigate).toBeCalledWith('FoodSearch',{});
    })

    /**
     * Check IF clicking Add Sport redirect to AddSport
     */
    test("Test Add Sport", () =>{
         //GET THE ADD FOOD BUTTON
         const mealClick = tree.root.findByProps({id:'breakfast'}).findByProps({testID:'AddSportID'}).props;
         //Click button
         act(()=>mealClick.onPress());
         //Check Consequences
         expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_MEAL', payload: { mealType: 'breakfast' } });
  
         expect(mock_navigation.navigate).toBeCalledWith('SportActivity',{});
         
    });
});