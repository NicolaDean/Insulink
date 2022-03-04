import React, { useEffect,useContext } from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localStorage from '../utils/localStoreManager'
import { UserDataContext } from '../../stateManager/userDataProvider';
/*
FUNCTION TO GET DATA
const getData =async () => {
}

*/
export const EditPersonalData = ({ navigation }) =>{
    

    const [userData, setUserData] = useContext(UserDataContext);

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState("");
    const [ISF, setISF] = useState(0);
    const [CHORatio, setCHORatio] = useState(0);


    const saveData = async () => {

        //Save context variable containing user data
       setUserData({
        weight:weight,
        height:height,
        age:age,
        name:name,
        ISF:ISF,
        CHORatio:CHORatio
      });
      //Save updated user data to local storage
       localStorage.saveUserData(userData);
      //navigate back to Personal Data
       navigation.navigate('PersonalData',{})
    }

    const getData = async () => {
        
        setWeight(userData.weight);
        setAge(userData.age);
        setHeight(userData.height);
        setCHORatio(userData.CHORatio);
        setISF(userData.ISF);
        setName(userData.name);
    }

    useEffect(()=>{
        getData();
    },[]);

return (
    <View style={styles.sectionContainer}>
<TextInput style={styles.searchBox} value={name}      placeholder="Name" onChangeText={setName}/>        
<TextInput style={styles.searchBox} value={weight}    placeholder="Weight [kg]" onChangeText={setWeight}/>
<TextInput style={styles.searchBox} value={height}    placeholder="Height [cm]" onChangeText={setHeight}/>
<TextInput style={styles.searchBox} value={age}       placeholder="Age" onChangeText={setAge}/>
<TextInput style={styles.searchBox} value={ISF}       placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={setISF}/>
<TextInput style={styles.searchBox} value={CHORatio}  placeholder="CHO Ratio (grams of CHO per 1 unit) (Optional)" onChangeText={setCHORatio}/>


<CustomButton style={styles.button} title="Save Change"
              onPress={() => saveData()
            }
            />

</View> 

    );
    
}

export default EditPersonalData;