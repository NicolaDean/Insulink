import React from "react";
//import {cleanup, fireEvent, render} from '@testing-library/react';
import {create,act} from 'react-test-renderer';
import Food from "../../src/pages/foodSearch/food";
import * as actions from "../../src/stateManager/reduxStates/actions/macroTracker";
import { dummyApple, dummyAppleDeletable } from "../../testHelper/dataForTest/foods";
///import { mock_redux } from "../../__mocks__/react-redux";


const mockDispatch = jest.fn((action) => console.log(action));
const mockDelete = jest.fn((action) => console.log(action));

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}
jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/Easing');
jest.mock('react-native/Libraries/Animated/animations/TimingAnimation');


const removeFood= jest.spyOn(actions,'removeFood');

jest.mock('react-redux', () => {return {
    useDispatch: () => mockDispatch,
    connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
      mapStateToProps,
      mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
      reactComponent,
      mockDispatch
    }),
    Provider: ({children}) => children,
    dispatch : mockDispatch
  }});

const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

const tree = create(<Food nav={mock_navigation} data={dummyApple}/>);

describe("TEST ON FOOD COMPONENT:",()=>{

    /**
     * Semplicemente snapshot
     */
    test("Food SnapShot: ",()=>{
        expect(tree).toMatchSnapshot();
    });

    test("Click Test", () =>{
        const foodClick = tree.root.findByProps({testID:'TouchableFood'}).props;//Added TestId to TouchableOpacity
        //Click The food
        act(()=>foodClick.onPress());
        //Expect getDetails to be called and navigate to details
        expect(mock_navigation.navigate).toBeCalledWith("FoodDetails",{data : dummyApple,foodInfo:dummyApple,editable: false});
    });

    test("Delete Test", () => {
        const deletable = create(<Food nav={mock_navigation} deletable={true} data={dummyAppleDeletable}/>);
        const foodClick = deletable.root.findByProps({testID:'TouchableFood'}).props;//Added TestId to TouchableOpacity
       
        act(()=>foodClick.onLongPress());
        const deleteButton = deletable.root.findByProps({testID:'DeleteButton'}).props;

        act(()=>deleteButton.onPress());
        //CHECK IF DISPATCH IS CALLED CORRECTLY
        expect(mockDispatch).toBeCalledTimes(1); //Only 1 dispatch call 
        expect(removeFood).toBeCalled();         //Check if the wanted action is called
        expect(removeFood).toBeCalledWith(dummyAppleDeletable); //Check if action called with right dataw
        
    })

    test("Content Test", () =>{

    });
});