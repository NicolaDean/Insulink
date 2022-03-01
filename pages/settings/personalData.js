import {Text, View ,StyleSheet} from 'react-native';
import React,{ useState,useEffect } from 'react';
import CustomButton from '../../customComponents/customButton';
import InsulineCalculator, { calculator } from '../utils/insulineCalculator';
import * as localStorage from '../utils/localStoreManager'

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
    const [userData,setUserData] = useState(localStorage.getEmptyUser());
    

    //TODO UNDERSTAND WHY NOT CALLED ALWAYS
    useEffect(()=>{
        const loadData = async()=>{
            var data = await localStorage.getUserData();

            console.log("R:"+counter + JSON.stringify(data));
    
            setUserData(data);
            setCounter(counter+1);//Contatore di debug per vedere quante volte viene chiamata
            return;
        };

        loadData();
    },[]);

    //TODO understand how to load info after rendering (useEffect (?))

    return (

        <View>
            <Text style={{fontWeight:"bold",fontSize:24}}>Personal Data:</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Weight:</Text>
                <Text >{userData.weight}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Height:</Text>
                <Text >{userData.weight}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Age:</Text>
                <Text >{userData.weight}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Name:</Text>
                <Text >{userData.name}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>ISF:</Text>
                <Text >{userData.ISF}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>CHORatio:</Text>
                <Text >{userData.CHORatio}</Text>
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
const styles = StyleSheet.create({
    fieldContainer:{
        flexDirection:'row'
    }
});