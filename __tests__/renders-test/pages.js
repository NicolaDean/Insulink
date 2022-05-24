import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import Food from '../../src/pages/foodSearch/food';
import { FirebaseQuery } from '../../src/utils/firebaseQuery';
import { dummyApple,dummyAppleDeletable } from '../../testHelper/dataForTest/foods';
import { foodDetails as testDetails } from '../../src/utils/testingJsons';
import FoodDetails from '../../src/pages/foodSearch/foodDetails';

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}


jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');

jest.mock('victory-native', () => 'VictoryPie');





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

     /* test('Render Food Details',()=>{

        FirebaseQuery.getIngredientDetailsAlternative = jest.fn((a)=>{
          console.log("BANANAA");
          const res =  Promise.resolve(testDetails);

          return res._W;
        });

        const res = FirebaseQuery.getIngredientDetailsAlternative("apple");
        //console.log(JSON.stringify(res));
        const params = {data : dummyApple,foodInfo:dummyAppleDeletable,editable : false}

        const foodDetails = renderer.create(<FoodDetails route = {{params:params}}/>).toJSON();
        expect(foodDetails).toMatchSnapshot();
      })*/

});//<Food data={dummyApple}/>