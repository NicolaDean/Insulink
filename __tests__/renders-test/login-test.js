import React from "react";
import {create,act} from 'react-test-renderer';
import { userMethods } from "../../src/constants/reducers";
import { mockedStore } from "../../testHelper/reduxMock";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { Provider } from "react-redux";
import Login from "../../src/pages/login/login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as userActions from "../../src/stateManager/reduxStates/actions/userAction";
import { registrationErrors } from "../../src/constants/registrationSteps";


const dummyUser ={
  email:"test@a.com",
  password:"22222",
  name:"dummy",
  surname:"aaa",
  weight:80,
  height:180,
  birthday:{seconds:0,nanoseconds:0},
  isf:0,
  choratio:0,
  glicemy:[],
  maxCarb:200,
  maxFat:100,
  maxProt:40,
}


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
jest.mock('@react-native-firebase/auth',()=>jest.fn((a)=>{}))
const mockedChange = jest.fn((a)=>{console.log(a)});
jest.mock("@react-native-firebase/auth",()=>jest.fn((a)=>{
  return{
    onAuthStateChanged:mockedChange
  }
}));
jest.mock('invariant/invariant');


//MOCK NAVIGATION
const mock_navigation = {
    navigate:jest.fn((a,b)=>{console.log("NAV to " + a)})
}

//MOCK GOOGLE SINGIN
  jest.mock("../../src/pages/login/socialLogin/googleLogin",()=>"[Gooogle Button]");
  const mockLoadData = jest.spyOn(userActions,'loadUserLocalData');

//LOGIN ACTION MOCK
  class errorClassMock{
    constructor(){
      this.errors = [];
      this.mock = jest.fn((e)=>{});
    }

    getError(){
      this.mock(this.e);
      return this.errors;
    }

    setError(e){
      this.errors = e;
    }
  }
  const mockLoginAction = jest.spyOn(userActions,'login');
  const errorValue = new errorClassMock();
  mockLoginAction.mockImplementation((a,b,e)=>{console.log("OK MOCK ANDATO");e(errorValue.getError());});


//Test start here
let tree = create();

class myVar{
  constructor(){
    this.value = "Test";
    this.useState = (a) => {return [this.value,this.mockSetState]}
    this.mockSetState = jest.fn((a)=>{this.value = a;console.log("SET:" + a);console.log(this.value);});
  }

  getValue(){
    return this.value;
  }
}

const mockHook = new myVar();
const mockUseState = jest.spyOn(React,'useState');
mockUseState.mockImplementation(mockHook.useState);


describe("Test the Login page:",()=>{
    
    beforeEach(async ()=>{
        await act(async() => {
            tree = create(<Provider store={mockedStore}>
                            <Login  navigation={mock_navigation}/>
                          </Provider>)
          });
    });

    
    test("Loading of Page and Login Redirect",()=>{
      //CHECK IF PAGE TRYED TO LOAD DATA FROM LOCALSTORAGE
      expect(mockLoadData).toBeCalled();

      //fake a login action
      act(()=>{mockedStore.dispatch({
        type: userMethods.login,
        payload: {
            usrData: dummyUser,
            userId:"ABCD12345",
        }
        })
      });
      //CHECK IF STATE CHANGED
      expect(mockedStore.getState()).toMatchSnapshot();
      //CHECK IF NAVIGATION TO HOME IS CALLED
      expect(mock_navigation.navigate).toBeCalledWith("BottomTab", {});

    })


  
    /**
     * Test navigation To Reg Page after button click
     */
    test("Registration Button Click",async ()=>{
      const regButton = tree.root.findByProps({testID:"RegistrationButtonID"}).props;
      
      //console.log("R:" + regButton);
      act(()=>regButton.onPress());

      expect(mock_navigation.navigate).toBeCalledWith('Registration',{});
    });

    /**
     * Test correct rendering of error message to be printed on screen
     */
    test("Test wrong credential Error Message",async () =>{
      const loginButton = tree.root.findByProps({testID:"LoginButtonID"}).props;
      
      //console.log("R:" + regButton);
      await act(async ()=>loginButton.onPress());

      //waitFor()
      //Mock error Message to throw
      errorValue.setError([registrationErrors.wrongPassword]);
      //const errorMessage = tree.root.findByProps({testID:"ErrorID"}).props;

      

      
    });

    /**
     * Check if after clicking Login button and inserted email and password it works correctly
     */
    test("Login Button Click",async ()=>{
      const loginBtn = tree.root.findByProps({testID:"LoginButtonID"}).props;
      
      const email = tree.root.findByProps({testID:"EmailID"}).props;
      const psw   = tree.root.findByProps({testID:"PswID"}).props;

      //email.value = "NIcola";
      act(()=>email.onChangeText("Tejst"));
      act(()=>psw.onChangeText("Test"));
     // errorValue.setError([registrationErrors.alreadyUserEmail]);
     await act(() => loginBtn.onPress());
     //Check that Login action is called after Click login
     expect(mockLoginAction.mock.calls[0]).toMatchSnapshot();

       
    });
})