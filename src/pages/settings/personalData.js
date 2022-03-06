import {Text, View ,StyleSheet} from 'react-native';
import React,{ useState,useEffect, useContext } from 'react';
import CustomButton from '../../customComponents/customButton';
import InsulineCalculator, { calculator } from '../utils/insulineCalculator';
import * as localStorage from '../utils/localStoreManager'
import { UserDataContext } from '../../stateManager/userDataProvider';
import styles from './style'

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
    

    var calculator = new InsulineCalculator;
    
    const [counter,setCounter] = useState(0);
    //const [userData,setUserData] = useState(localStorage.getEmptyUser());
    const [userData, setUserData] = useContext(UserDataContext);


    //TODO understand how to load info after rendering (useEffect (?))

    return (

        <View>
            <View style={styles.header}>
            <Text style={styles.headerTitle}>Personal User Data</Text>
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