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
import { configure } from "@testing-library/react";
import { NativeModules } from 'react-native';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
//FIREBASE MOCK
const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;

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


const mock_z = new yyyy();

GoogleSignin.configure = jest.fn(()=>{});
NativeModules.RNGoogleSignin = {
    BUTTON_SIZE_ICON: 0,
    BUTTON_SIZE_STANDARD: 0,
    BUTTON_SIZE_WIDE: 0,
    BUTTON_COLOR_AUTO: 0,
    BUTTON_COLOR_LIGHT: 0,
    BUTTON_COLOR_DARK: 0,
    SIGN_IN_CANCELLED: '0',
    IN_PROGRESS: '1',
    PLAY_SERVICES_NOT_AVAILABLE: '2',
    SIGN_IN_REQUIRED: '3',
    configure: jest.fn(),
    currentUserAsync: jest.fn(),
  };

  Google.GoogleSignin.hasPlayServices = () => Promise.resolve(true);
  Google.GoogleSignin.configure = () => Promise.resolve();
  Google.GoogleSignin.currentUserAsync = () => {
    return Promise.resolve({
      name: 'name',
      email: 'test@example.com',
      // .... other user data
    });
  };
jest.mock('@react-native-google-signin/google-signin', () => {
    const mockGoogleSignin = jest.requireActual('@react-native-google-signin/google-signin');
  
   
  
    // ... and other functions you want to mock
  
    return mockGoogleSignin;
  });


 // jest.mock('@react-native-firebase/auth');
  //jest.mock('@react-native-google-signin/google-signin');
  //jest.mock('../../src/pages/login/socialLogin/googleLogin');
  //jest.mock('@react-native-google-signin/google-signin', () => {});
 // jest.mock('node_modules/@react-native-google-signin/google-signin/');

describe("Test the Login page:",()=>{
    
    beforeAll(async ()=>{
        await act(async() => {
            tree = create(<Provider store={mockedStore}>
                            <Login  navigation={mock_navigation}/>
                          </Provider>)
          });

         
    });

    

    test("Error Display",()=>{

        expect(a).toHaveTextContent()
    })
})