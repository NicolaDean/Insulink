import React from "react";
import {create,act} from 'react-test-renderer';
import { userMethods } from "../../src/constants/reducers";
import Home from "../../src/pages/home/home";
import { login } from "../../src/stateManager/reduxStates/actions/userAction";
import { mockedStore } from "../../testHelper/reduxMock";
import CustomFirestoreMock from "../../__mocks__/@react-native-firebase/firebase";
import { FirebaseQuery } from "../../src/utils/firebaseQuery";
import { Provider } from "react-redux";

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
var tree;

describe("Test the Home component",()=>{

    beforeAll(async ()=>{

        await act(async() => {
            tree = create(<Provider store={mockedStore}>
                            <Home  navigation={mock_navigation}/>
                          </Provider>)
          });

         
    });

    afterEach(()=>{
       mock_navigation.navigate.mockClear();
    })

    test("Initial Checks and Snapshot",()=>{
        //Check redirect to login becouse unlogged
        expect(mock_navigation.navigate).toBeCalledWith("Login",{}); //NOT LOGGED, REDIRECT LOGIN
          
        //FAKE LOGIN
        act(()=>{
          mockedStore.dispatch(action);
        })

        //Snapshot
        expect(tree).toMatchSnapshot();
    })

    test("Click Diary Button:",()=>{
        const diary = tree.root.findByProps({testID:'DiaryButton'}).props;//Added TestId to TouchableOpacity
        //Click The food
        act(()=>diary.onPress());

        //Check redirect and props passed to redirect
        expect(mock_navigation.navigate).toBeCalledWith("MealDiary",{"openCalendar": false,});
    });



    test("Click Calendar Button:",()=>{
        const diary = tree.root.findByProps({testID:'CalendarButton'}).props;//Added TestId to TouchableOpacity
        //Click The food
        act(()=>diary.onPress());

        //Check redirect and props passed to redirect
        expect(mock_navigation.navigate).toBeCalledWith("MealDiary",{"openCalendar": true,});
    });

    test("Click ScannerButton Button:",()=>{
        const diary = tree.root.findByProps({testID:'ScannerButton'}).props;//Added TestId to TouchableOpacity
        //Click The food
        act(()=>diary.onPress());

        //Check redirect and props passed to redirect
        expect(mock_navigation.navigate).toBeCalledWith("ScannerPage",{}); //NOT LOGGED, REDIRECT LOGIN
    });

    test("Click Glucose Button",() =>{
        const diary = tree.root.findByProps({testID:'GlucoseButton'}).props;//Added TestId to TouchableOpacity
        
        console.log(diary);
        //Click The food
        act(()=>diary.onPress());
        
    });
});