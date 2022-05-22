import axios from 'axios';
import React from 'react';
import { api_axios,apiPath, Food_API } from '../../src/utils/apiQuery';
//import MockAdapter from 'axios-mock-adapter'


const x = jest.fn(async(config) =>{
    console.log("CONFIG:" + JSON.stringify(config));
    return new Promise(resolve=>resolve()); //THIS ALLOW TO FAKE THE REQUEST
});
let mock_axios;
jest.mock('axios', () => mock_axios = jest.fn(async(config) =>{
    console.log("CONFIGg:" + JSON.stringify(config));
    return new Promise(resolve=>resolve()); //THIS ALLOW TO FAKE THE REQUEST
}));


const dummyFoodList = {foods:[{food:"apple"}]};

//TODO ADD A TEST FOR CHECK NETWORK ERROE (eg by putting a bool in mock_axios with "throw error")
//MOCK FOOD_API.onError so we can check if it is called with the error

/**
 * THIS TESTS ALLOW TO CHECK IF AXIOS IS CALLED WITH THE CORRECT CONFIG OBJECT 
 * THE CHECK IS DONE BY SNAPSHOT OF MOCKED CONFIG 
 * (containing parameters, HTTP method, header...)
 */
describe("Food_API component TEST:",()=>{

    beforeAll(()=>{
        mock_axios.mockClear();
    });

    afterEach(() => {
        mock_axios.mockClear(); //TO RESET CALL STACK OF MOCK OBJECT
        //jest.restoreAllMocks();
    });

    test('Do Food Search', async () => {

        const userInput = "apple";

        const res = await Food_API.getFoodListAlternative(userInput);
          
        const axiosConfig = mock_axios.mock.calls[0];
        //I CHECK THAT THE AXIOS API IS CALLED ALWAYS WITH SAME CONFIGURATION
        expect(axiosConfig).toMatchSnapshot();
        
    });

    test('Retrive Food Details', async () => {

        const userInput = "apple";

        const res = await Food_API.getIngredientDetailsAlternative(userInput);
          
        const axiosConfig = mock_axios.mock.calls[0];

        console.log(JSON.stringify(mock_axios.mock.calls));
        //I CHECK THAT THE AXIOS API IS CALLED ALWAYS WITH SAME CONFIGURATION
        expect(axiosConfig).toMatchSnapshot();
    });

    test('Retrive Sport Calories', async () => {

        const userData = {weight:80,height:180};
        const userInput = "run for 2 hours";

        const res = await Food_API.getSportCalories(userInput,userData);
          
        const axiosConfig = mock_axios.mock.calls[0];

        console.log(JSON.stringify(mock_axios.mock.calls));
        //I CHECK THAT THE AXIOS API IS CALLED ALWAYS WITH SAME CONFIGURATION
        expect(axiosConfig).toMatchSnapshot();

    });

    test('Get Barcode Food', async () => {
        const userInput="BARRCODE";
        const res = await Food_API.getFoodListBarCode(userInput);
          
        const axiosConfig = mock_axios.mock.calls[0];

        console.log(JSON.stringify(mock_axios.mock.calls));
        //I CHECK THAT THE AXIOS API IS CALLED ALWAYS WITH SAME CONFIGURATION
        expect(axiosConfig).toMatchSnapshot();
    });
});