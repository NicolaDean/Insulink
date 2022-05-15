import React from 'react';

import { localStorage } from '../../src/utils/localStoreManager';
import { storageKeys } from '../../src/constants/localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}

jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('@react-native-async-storage/async-storage');


describe('LocalStorage API Call Test:',()=>{


    test('Check User Data Saving on local storage', async () => {

        const data = {id:'1233',name:'nicola'};
        await localStorage.saveUserData(data);

         expect(AsyncStorage.setItem).toBeCalledWith(storageKeys.userData,JSON.stringify(data));
    });

});
