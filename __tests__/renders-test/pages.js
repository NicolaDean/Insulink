import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import CustomButton from '../../src/customComponents/customButton';
import Food from '../../src/pages/foodSearch/food';
import FoodDetails from '../../src/pages/foodSearch/foodDetails';
import { dummyApple,dummyAppleDeletable } from '../../testHelper/dataForTest/foods';


const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}


jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');

jest.mock('victory-native', () => 'VictoryPie');



/*const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
  connect: (a) =>{ return (a) =>{}},
}));*/

jest.mock('react-redux');

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

      /*test('Render Food Details',()=>{

        const params = {data : dummyApple,foodInfo:dummyAppleDeletable,editable : false}

        const foodDetails = renderer.create(<FoodDetails />).toJSON();
        expect(foodDetails).toMatchSnapshot();
      })*/

});//<Food data={dummyApple}/>