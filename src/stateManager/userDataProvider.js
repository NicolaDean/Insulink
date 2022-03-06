
import React,{ useState, createContext, useEffect } from 'react';
import EditPersonalData from '../pages/settings/editPersonalData';
import { PersonalData } from '../pages/settings/personalData';
import * as localStorage from '../pages/utils/localStoreManager'

export const UserDataContext = createContext();

export const UserDataProvider = (props) =>{

    //Create a state shader between all components inside UserDataProvidr
    const [userData,setUserData] = useState({
            weight: 0,
            height: 0,
            age: 0,
            name: "pagliaccio",
            ISF: 0,
            CHORatio: 0});
    
            const getData = async () => {
                var data = await localStorage.getUserData();
                
                console.log("load data");
                setUserData(data);
            }
        
            //LOAD DATA FROM LOCAL STORAGE
            useEffect(()=>{
                console.log("load data");
                getData();
            },[]);
    return (
        <UserDataContext.Provider value={[userData,setUserData]}>
            {props.children}
        </UserDataContext.Provider>
    );
//{props.children}

}