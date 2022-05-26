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


const reduxx = {
  useDispatch: () => mockDispatch,
  connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
    mapStateToProps,
    mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
    reactComponent,
    mockDispatch
  }),
  Provider: ({children}) => children,
  dispatch : mockDispatch,
  getMock: () => mockDispatch
}
const mockDispatch = jest.fn((action) => console.log(action));
jest.mock('react-redux',() => reduxx);

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