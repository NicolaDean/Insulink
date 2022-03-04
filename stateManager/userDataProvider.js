
import react,{ useState, createContext, useEffect } from 'react';
import EditPersonalData from '../pages/settings/editPersonalData';
import { PersonalData } from '../pages/settings/personalData';

export const UserDataContext = createContext();

export const UserDataProvider = (props) =>{

    const [userData,setUserData] = useState({
            weight: 0,
            height: 0,
            age: 0,
            name: "pagliaccio",
            ISF: 0,
            CHORatio: 0});
    
    const loadData = async ()=>{
        let data = await localStorage.getUserData();

        console.log("R:"+counter + JSON.stringify(data));
    
        setUserData(data);
    }
    useEffect(()=>{
        // loadData();
    },[]);

    return (
        <UserDataContext.Provider value={[userData,setUserData]}>
            {props.children}
        </UserDataContext.Provider>
    );
//{props.children}

}