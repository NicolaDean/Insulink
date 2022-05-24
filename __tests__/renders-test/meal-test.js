import React from "react";
//import {cleanup, fireEvent, render} from '@testing-library/react';
import {create,act} from 'react-test-renderer';
import { Food_API } from "../../src/utils/apiQuery";




const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

const mockApi = jest.spyOn(Food_API,'getFoodListAlternative');
mockApi.mockImplementation = (a) =>{console.log("METHOD" +  a)}
//const tree = create(<FoodSearch nav={mock_navigation}/>);

describe("TEST ON FOOD COMPONENT:",()=>{

    /**
     * Semplicemente snapshot
     */
    test("Food SnapShot: ",()=>{
        //expect(tree).toMatchSnapshot();
    });
});