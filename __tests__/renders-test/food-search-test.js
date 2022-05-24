import React from "react";
//import {cleanup, fireEvent, render} from '@testing-library/react';
import {create,act} from 'react-test-renderer';
import CustomImageButton from "../../src/customComponents/customImageButton";
import FoodSearch from "../../src/pages/foodSearch/foodSearch";
import * as actions from "../../src/stateManager/reduxStates/actions/macroTracker";
import { Food_API } from "../../src/utils/apiQuery";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { dummyApple, dummyAppleDeletable } from "../../testHelper/dataForTest/foods";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
jest.useFakeTimers();
const mock_firebase = new CustomFirestoreMock();

const firebasee = () =>{
    return {
        collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
        doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
    };
}
jest.mock('../../src/utils/firebaseQuery');
jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/Easing');
jest.mock('react-native/Libraries/Animated/animations/TimingAnimation');



const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

const mockApi = jest.spyOn(Food_API,'getFoodListAlternative');
mockApi.mockImplementation = (a) =>{console.log("METHOD" +  a)}
const tree = create(<FoodSearch nav={mock_navigation}/>);

describe("TEST ON FOOD COMPONENT:",()=>{

    /**
     * Semplicemente snapshot
     */
    test("Food SnapShot: ",()=>{
        expect(tree).toMatchSnapshot();
    });

    /**
     * Test if Search button trigger API call
     */
    test("Search Button Click", () =>{
        //Search the Image search button
        const barrcodeBtn = tree.root.findAllByType(CustomImageButton)[0].props;
        //Click it
        act(()=>barrcodeBtn.onPress());
        //Check if navigation is called correctly
    });

    test("Barrcode Button Click", () =>{
        //Search the Image search button
        const barrcodeBtn = tree.root.findAllByType(CustomImageButton)[1].props;
        //Click it
        act(()=>barrcodeBtn.onPress());
        //Check if navigation is called correctly
        expect(mock_navigation.navigate).toBeCalledWith('ScannerPage',{});
    })

    
});