import {Text, View ,StyleSheet} from 'react-native';
import React,{ useState,useEffect, useContext } from 'react';
import CustomButton from '../../customComponents/customButton';
import { UserDataContext } from '../../stateManager/userDataProvider';
import { useDispatch } from 'react-redux';
import styles from './style'

import * as database from '../../utils/firebaseQuery'
import { register } from '../../stateManager/reduxStates/actions/userAction';
/*Params
var actualGlycemia;
var targetGlycemia;
var carbo;
var proteins;
var fats;
var CHORatio;
var insulineSensitivity;
var limit=180;
var totalInsulineDaily;
var weight
var basal  //backgound insuline daily
*/

export const PersonalData = ({ navigation , route}) =>{
    

    
    const [counter,setCounter] = useState(0);
    //const [userData,setUserData] = useState(localStorage.getEmptyUser());
    const [userData, setUserData] = useContext(UserDataContext);

    const dispatch = useDispatch();

    const getData = async () =>{
        const email = 'nicola@gmail.com';
        const user = (await database.getUserData(email));
        const glicemy = (await database.getUserGlicemy(email));

        console.log("-------------USER DATA:-----------------")
        console.log("User: " + JSON.stringify(user));
        console.log("Glicemy: " + JSON.stringify(glicemy));
        console.log("----------------------------------------")

        //dispatch(register({email:"paolo@gmail.com",name:"Paolo",surname:"Dean"}));

        //await database.addGlicemyValue("paolo@gmail.com",{value:10,time:{seconds:1000,nanoseconds:0}})
        
    }

    useEffect(()=>{
        getData();
    },[])
    //TODO understand how to load info after rendering (useEffect (?))

    return (

        <View>
            <View style={styles.header}>
            <Text style={styles.headerTitle}>Personal User Data:</Text>
        </View>
            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>Name:</Text>
                <Text adjustsFontSizeToFit style={styles.value}>{userData.name}</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>Age:</Text>
                <Text adjustsFontSizeToFit style={styles.value}>{userData.age}</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>Weight:</Text>
                <Text  adjustsFontSizeToFit style={styles.value}>{userData.weight}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>Height:</Text>
                <Text adjustsFontSizeToFit style={styles.value}>{userData.height}</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>ISF:</Text>
                <Text adjustsFontSizeToFit style={styles.value} >{userData.ISF}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text adjustsFontSizeToFit style={styles.fieldTitle}>CHORatio:</Text>
                <Text adjustsFontSizeToFit style={styles.value}>{userData.CHORatio}</Text>
            </View>
            
            <CustomButton
                title='Edit'
                onPress={() => navigation.navigate('EditPersonalData',{}) }
            />
        </View>
           
    );
    

    //TODO create a method to load usefull data from firebase or local storage and call methods of insulineCalculator       
    //TODO show all user data and put an "add button"
}
export default PersonalData;