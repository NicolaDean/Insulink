import React, { useState } from "react";
import {create,act} from 'react-test-renderer';
import { mockedStore } from "../../testHelper/reduxMock";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { Provider } from "react-redux";
import {Registration} from "../../src/pages/login/register";
import { inputChecker } from "../../src/utils/inputChecker";
//import { inputChecker as realInputChecker } from "../../src/utils/inputChecker";
import { registrationErrors } from "../../src/constants/registrationSteps";

//FIREBASE MOCK
const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;

  const firebasee = () =>{
      return {
          collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
          doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
      };
  }

jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('invariant/invariant');

//jest.mock('@miblanchard/react-native-slider',()=>"Slider");

//MOCK NAVIGATION
const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}


//TREE DECLARATION
let tree =create();
//const mockedError = jest.fn((e)=>{console.log(e)});

const mockedError   = jest.spyOn(inputChecker,'addError');
const mockedChecker = jest.spyOn(inputChecker,'checkRegistrationInputs');

//inputChecker.checkRegistrationInputs = mockedChecker;

describe("Test the Login page:",()=>{
       

    afterEach(()=>{
        mockedError.mockClear();
       // mockedChecker.mockClear();
    })
    test("Error Display TEST",async()=>{
        await act(async() => {
            const params = {uid:undefined,mustCompleteReg:undefined};
            tree = create(<Provider store={mockedStore}>
                            <Registration route={{params:params}} initStep={1} navigation={mock_navigation}/>
                          </Provider>)
          });

        const nextBtn = tree.root.findByProps({testID:"NextID"}).props;

        const emailInput = tree.root.findByProps({testID:"EmailID"}).props;
        const pswInput = tree.root.findByProps({testID:"PswID"}).props;
    
        //Click next
        act(()=>nextBtn.onPress());
        
        //Check Errors Missing data are printed
        expect(mockedError).toBeCalledWith(registrationErrors.noEmailInserted);
        expect(mockedError).toBeCalledWith(registrationErrors.noPassword);
        expect(mockedError).toBeCalledWith(registrationErrors.weakPassword);

        act(()=>{emailInput.onChangeText("Nicola")});
        act(()=>{pswInput.onChangeText("1234")});

        //Next Page (2)
       // mockedChecker.mockClear();
        mockedChecker.mockReturnValueOnce(true);
        act(()=>nextBtn.onPress());
        //Test Surname/Name Field 
        const nameInput = tree.root.findByProps({testID:"NameID"}).props;
        const surname   = tree.root.findByProps({testID:"SurnameID"}).props;
        console.log(mockedChecker.mock.calls);

        //Next Page (3)
        //mockedChecker.mockClear();
        mockedChecker.mockReturnValueOnce(true);
        act(()=>nextBtn.onPress());

        const height = tree.root.findByProps({testID:"HeightID"}).props;
        const weight   = tree.root.findByProps({testID:"WeightID"}).props;

        //Next Page (4)
        //mockedChecker.mockClear();
        mockedChecker.mockReturnValueOnce(true);
        act(()=>nextBtn.onPress());

        const carb = tree.root.findByProps({testID:"CarbID"}).props;
        const prot   = tree.root.findByProps({testID:"ProtID"}).props;
        const fat   = tree.root.findByProps({testID:"FatID"}).props;
        //THE REST OF INPUTS CHECKING ARE DONE BY USING UNIT TESTING ON INPUT CHECKER 
        //(due to lack of mock possibility we can not go to page 2 of register)

    
    })

    /**
     * Test If error Occur also on page 2  
     */
    test("Step 2 Page (Personal INFO): ",async()=>{
        
        console.log("PAGE 2:");
        await act(async() => {
            const params = {uid:undefined,mustCompleteReg:undefined};
            tree = create(<Provider store={mockedStore}>
                            <Registration route={{params:params}} initStep={2} navigation={mock_navigation}/>
                          </Provider>)
          });

          
          const nextBtn = tree.root.findByProps({testID:"NextID"}).props;
          
          act(()=>nextBtn.onPress());
          //Load new page component
          const nameInput = tree.root.findByProps({testID:"NameID"}).props;
          const surnameInput = tree.root.findByProps({testID:"SurnameID"}).props;
  
          //Press Button
          act(()=>nextBtn.onPress());
          console.log(mockedError.mock.calls);
          //Check missing data errors
          expect(mockedError).toBeCalledWith(registrationErrors.noNameInserted);
          expect(mockedError).toBeCalledWith(registrationErrors.noSurnameInserted);
    })

   //Other pages dosnt require check error becouse they are already on a SAFE INPUT with limited values
})