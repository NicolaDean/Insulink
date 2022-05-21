import React from 'react';

import { localStorage } from '../../src/utils/localStoreManager';
import { storageKeys } from '../../src/constants/localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseQuery } from '../../src/utils/firebaseQuery';

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}

jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('@react-native-async-storage/async-storage');


describe('LocalStorage API Call Test:',()=>{

    //USERS METHODS
    test('Save User Data', async () => {

        const data = {id:'1233',name:'nicola'};
        await localStorage.saveUserData(data);

         expect(AsyncStorage.setItem).toBeCalledWith(storageKeys.userData,JSON.stringify(data));
    });

    test('Get User Data', async () =>{

        await localStorage.getUserData();
        const date = FirebaseQuery.glicemyDateFormatter(new Date());
        //FIRST RETRIVE GLICEMY DATA
        expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1,storageKeys.glicemy+date);
        //THEN GET USER DATA
        expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2,storageKeys.userData);
        
    });

    //GLICEMY METHODS
    test('Add Glicemy Data', async () =>{
        const new_glicemy = {value: 33,time:new Date()};

        const date = FirebaseQuery.glicemyDateFormatter(new Date());
        await localStorage.storeGlicemyData(new_glicemy,new Date());

        const formatted_glicemy = FirebaseQuery.changeGlicemyTimeFormat(new_glicemy,true);
        //FIRST GET OLD DATA
        expect(AsyncStorage.getItem).toHaveBeenCalledWith(storageKeys.glicemy+date);
        //THEN ADD NEW DATA
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKeys.glicemy+date,JSON.stringify([formatted_glicemy]));
    });

    test('Get Glicemy Data', async () =>{
        const date = FirebaseQuery.glicemyDateFormatter(new Date());
        await localStorage.getGlicemyData(new Date());
        
        //CALLED WITH GLICEMY KEY + TODAY DATE FORMATTED CORRECTLY
        expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1,storageKeys.glicemy+date);
    });

    //DIARY METHODS
    test('Save Food Diary', async () =>{
        const foodDiary = {diary:"test"};
        const date = FirebaseQuery.glicemyDateFormatter(new Date());
        await localStorage.storeFoodDiary(date,foodDiary);

        //Call set data with foodDiary key + date formatted correctly and the food diary
        expect(AsyncStorage.setItem).toBeCalledWith(storageKeys.foodDiary + date,JSON.stringify(foodDiary));
    });

    test('Get Food Diary', async () =>{
        const date = FirebaseQuery.glicemyDateFormatter(new Date());
        await localStorage.loadFoodDiary(date);

        //Call get data with foodDiary key + date formatted correctly
        expect(AsyncStorage.getItem).toBeCalledWith(storageKeys.foodDiary + date);

    });
    
});
