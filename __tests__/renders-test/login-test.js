import React from "react";
import {create,act} from 'react-test-renderer';
import { userMethods } from "../../src/constants/reducers";
import Home from "../../src/pages/home/home";
import { login } from "../../src/stateManager/reduxStates/actions/userAction";
import { mockedStore } from "../../testHelper/reduxMock";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { Provider } from "react-redux";
import Login from "../../src/pages/login/login";
import * as Google from "../../src/pages/login/socialLogin/googleLogin";

//FIREBASE MOCK
const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;
FirebaseQuery.glicemyDateFormatter = (d) => {return "[DATE]"}
  const firebasee = () =>{
      return {
          collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
          doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
      };
  }
  
  const userData = {name:"test",height:77,glicemy: []}
  const userId = "ABCDE123456";
  const action ={
      type:userMethods.login,
      payload:{
          usrData:userData,
          userId:userId
      }
  }

jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('invariant/invariant');

//MOCK NAVIGATION
const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

//MOCK GOOGLE SINGIN

jest.mock('@react-native-google-signin/google-signin');

const googleMock = jest.spyOn(Google,'onGoogleButtonPress');
googleMock.mockReturnValue = {
    uid:"ABCDE12345"
}

//TREE DECLARATION
var tree;

/*jest.mock("./AwesomeComponent", () => ({
    AwesomeComponent: () => {
      const MockName = "named-awesome-component-mock";
      return <MockName />;
    },
  }));*/

describe("Test the Login page:",()=>{
    
    beforeAll(async ()=>{

        await act(async() => {
            tree = create(<Provider store={mockedStore}>
                            <Login  navigation={mock_navigation}/>
                          </Provider>)
          });

         
    });

    

    test("Error Display",()=>{

    })
})