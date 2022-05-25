import React from "react";
import {create,act} from 'react-test-renderer';
import Food from "../../src/pages/foodSearch/food";
import * as actions from "../../src/stateManager/reduxStates/actions/macroTracker";
import { dummyApple, dummyAppleDeletable } from "../../testHelper/dataForTest/foods";
//import {reduxMock} from '../../jest/react-redux'

//const mock_r = new CustomReduxMock();


const mockDispatch = jest.fn((action) => console.log(action));
const removeFood= jest.spyOn(actions,'removeFood');
const reduxMock = {
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


jest.mock('react-redux', () => reduxMock);

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

    /**
     * Test if on Food Click we are navigated to Food Details
     */
    test("Click Test", () =>{
        const foodClick = tree.root.findByProps({testID:'TouchableFood'}).props;//Added TestId to TouchableOpacity
        //Click The food
        act(()=>foodClick.onPress());
        //Expect getDetails to be called and navigate to details
        expect(mock_navigation.navigate).toBeCalledWith("FoodDetails",{data : dummyApple,foodInfo:dummyApple,editable: false});
    });

    /**
     * Test if A deletable food works fine
     */
    test("Delete Test", () => {
        const deletable = create(<Food nav={mock_navigation} deletable={true} data={dummyAppleDeletable}/>);
        const foodClick = deletable.root.findByProps({testID:'TouchableFood'}).props;//Added TestId to TouchableOpacity
       
        act(()=>foodClick.onLongPress());
        const deleteButton = deletable.root.findByProps({testID:'DeleteButton'}).props;

        act(()=>deleteButton.onPress());
        //CHECK IF DISPATCH IS CALLED CORRECTLY
        expect(reduxMock.getMock()).toBeCalledTimes(1); //Only 1 dispatch call 
        expect(removeFood).toBeCalled();         //Check if the wanted action is called
        expect(removeFood).toBeCalledWith(dummyAppleDeletable); //Check if action called with right dataw
        
    })

    test("Content Test", () =>{

    });
});