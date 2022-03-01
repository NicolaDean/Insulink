import React, { useEffect } from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localStorage from '../utils/localStoreManager'
import { set } from 'react-native-reanimated';

/*
FUNCTION TO GET DATA
const getData =async () => {
}

*/
export const EditPersonalData = ({ navigation }) =>{
    
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState("");
    const [ISF, setISF] = useState(0);
    const [CHORatio, setCHORatio] = useState(0);


    const saveData = async () => {
       localStorage.saveUserData({
         weight:weight,
         height:height,
         age:age,
         name:name,
         ISF:ISF,
         CHORatio:CHORatio
       });

       navigation.navigate('PersonalData',{})
    }

    const getData = async () => {
        var data = await localStorage.getUserData();
        setWeight(data.weight);
        setAge(data.age);
        setHeight(data.height);
        setCHORatio(data.CHORatio);
        setISF(data.ISF);
        setName(data.name);
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


<CustomButton style={styles.button} title="Save Changes"
              onPress={() => saveData()
            }
            />

</View> 

    );
    
}

export default EditPersonalData;