import React from 'react';
import { FirebaseQuery, tables } from '../../src/utils/firebaseQuery';
import CustomFirestoreMock from '../../__mocks__/@react-native-firebase/firebase';
import firestore from '@react-native-firebase/firestore'
import { firebase } from "@react-native-firebase/firestore";
import { glicemyChartFormatter } from '../../src/utils/chartDataFormatter';


const mock_firebase = new CustomFirestoreMock();

const firebasee = () =>{
    return {
        collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
        doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
    };
}

jest.mock('@react-native-firebase/firestore',()=> firebasee);


describe("TESTING OUR FIREBASE API FUNCTIONS:", () =>{

    //const mock_firebase = new CustomFirestoreMock();
    afterAll(()=>{
        mock_firebase.reset();
    });

    beforeAll(()=>{
        mock_firebase.reset();
        FirebaseQuery.users = mock_firebase;

    });

    test("Register user ", ()=>{

        const userId = "ID";
        const user = {name:"pippo",surname:"paperoni"};
        FirebaseQuery.registerUser(userId,user);
        
        //GO TO user->id document
        expect(mock_firebase.mockDoc).toHaveBeenCalledWith(userId);
        //Set the document to the new json
        expect(mock_firebase.mockSet).toHaveBeenCalledWith(user);
        
    });

    test("Get User Data ", ()=>{

        const id = "abcdefghi12345";
        FirebaseQuery.getUserData(id);

        //OPEN THE USER COLLECTION ON DOCUMENT WITH ID
        expect(mock_firebase.mockDoc).toBeCalledWith(id);
        //GET IT
        expect(mock_firebase.mockGet).toBeCalled();
        //RETRIVE DATA()//TODO

    });

    test("Update User Data ", ()=>{
        //TODO
    });

    test("Get Glicemy of a user in a specific date ", ()=>{

        const id = "abcdefghi12345";

        FirebaseQuery.getUserGlicemy(id,new Date());
        //Use mock return value
        //mock_firebase._mockAddReturn({})
    });

    test("Add Glicemy of a user in a specific date ", ()=>{

        const glicemy = {glicemy:"test"};
        const id = "abcdefghi12345";
        const glicemyId = FirebaseQuery.glicemyDateFormatter();

        FirebaseQuery.addGlicemyValue(id,glicemy);
        
        //select a specific user by id
        expect(mock_firebase.mockDoc).toBeCalledWith(id);
        //Reach Glicemy Table
        expect(mock_firebase.mockCollection).toBeCalledWith(tables.glicemyTable);
        //select the glicemy ID (based on today date)
        expect(mock_firebase.mockDoc).toBeCalledWith(glicemyId);
        //Reach The file
        expect(mock_firebase.mockGet).toBeCalled();

        //Add Glicemy To DB
        //CANT MOCK THE SET BECAUSE CANT ADD THE "ref" stuff inside the mock
        //expect(mock_firebase.mockU).toBeCalledWith({data:[glicemy]}); ->TRY USING mockReturnValue
    })

    test("Get Food Diary of a user in a date", ()=>{
        const id = "abcdefghi12345";
        const formattedDate = FirebaseQuery.glicemyDateFormatter();

        const wantedVal ={diary:"test"};
        mock_firebase._mockGetReturn = (wantedVal);

        
        const res = FirebaseQuery.getFoodDiary(id,formattedDate);

        //select a specific user by id
        expect(mock_firebase.mockDoc).toBeCalledWith(id);
        //Reach Glicemy Table
        expect(mock_firebase.mockCollection).toBeCalledWith(tables.diaryTable);
        //select the glicemy ID (based on today date)
        expect(mock_firebase.mockDoc).toBeCalledWith(formattedDate);
        //Reach The file
        expect(mock_firebase.mockGet).toBeCalled();

        console.log(JSON.stringify(mock_firebase._mockGetReturn) + " -> " + JSON.stringify(res));

        //DATA() function to retrive data: -> CANT MOCK DATA DUE TO PARENTHESIS
        //expect(mock_firebase.mockData).toBeCalled();

        //CHECK RESULT
        expect(res).toBe(wantedVal);

        //NOW TEST WITH NO RESULT
        res = FirebaseQuery.getFoodDiary(id,formattedDate);

        mock_firebase._mockAddReturn = (undefined);

        expect(res).toBe([]);


    });


    test("Update Food Diary of a user in a date ", ()=>{

        const diary = {diary:"test"};
        const id = "abcdefghi12345";
        const formattedDate = FirebaseQuery.glicemyDateFormatter();

        FirebaseQuery.saveFoodDiary(id,formattedDate,diary);

        //Reach the specific user by ID
        expect(mock_firebase.mockDoc).toBeCalledWith(id);
        //Reach the Food Diary Collection of this user
        expect(mock_firebase.mockCollection).toBeCalledWith(tables.diaryTable);
        //Set the Food Diary ID
        expect(mock_firebase.mockDoc).toBeCalledWith(formattedDate);
        //Reach The file
        expect(mock_firebase.mockGet).toBeCalled();

        //CANT TEST THE SET DUE TO IMPOSSIBILITY OF MOCK VARIABLE
        //eg:code like var x = firestore().collection(..);  x.ref.doc(..) -> cant mock x...
    });

})