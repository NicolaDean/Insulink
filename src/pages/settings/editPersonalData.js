import React, { useEffect,useContext } from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localStorage from '../utils/localStoreManager'
import { UserDataContext } from '../../stateManager/userDataProvider';
import {StyleTextInput} from '../../customComponents/StyleTextInput'
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
        <View style={styles.fieldContainer}>
<TextInput  style={styles.field} value={name}      placeholder="Name" onChangeText={setName}/> 
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={weight}    placeholder="Weight [kg]" onChangeText={setWeight}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={height}    placeholder="Height [cm]" onChangeText={setHeight}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={age}       placeholder="Age" onChangeText={setAge}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={ISF}       placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={setISF}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={CHORatio}  placeholder="Grams of CHO per 1 unit (Optional)" onChangeText={setCHORatio}/>
</View>
    

<CustomButton  title="Save Change"
              onPress={() => saveData()
            }
            />

</View> 

    );
    
}

export default EditPersonalData;