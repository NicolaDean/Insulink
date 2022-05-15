import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import CustomButton from '../../src/customComponents/customButton';
import Food from '../../src/pages/foodSearch/food';
import { dummyApple,dummyAppleDeletable } from '../../testHelper/dataForTest/foods';


const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}


jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');



const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

describe('Render our Food Related Components',()=>{
    
    beforeEach(() => {
        //Executed before each test
    });


    test('Render Food', () => {

        //Render Deletable Food
        const deletableFood = renderer.create(<Food deletable={true} data={dummyAppleDeletable}/>).toJSON();
        expect(deletableFood).toMatchSnapshot();

        //Render Normal Food
        const normalFood = renderer.create(<Food data={dummyApple}/>).toJSON();
        expect(normalFood).toMatchSnapshot();

        //Render Sport
        //TODO
      });

});//<Food data={dummyApple}/>