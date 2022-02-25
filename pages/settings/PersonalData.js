import React from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'

/*
FUNCTION TO GET DATA
const getData =async () => {
}

*/
export const PersonalData = ({ navigation }) =>{

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState("");
    const [ISF, setISF] = useState(0);
    const [CHORatio, setCHORatio] = useState(0);

    const getData =async () => {
        try {
             } catch (error) {
            
             } finally {
             }
    }

    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>);

return (
    <View style={styles.sectionContainer}>
<TextInput style={styles.searchBox} placeholder="Name" onChangeText={setName}/>        
<TextInput style={styles.searchBox} placeholder="Weight [kg]" onChangeText={setWeight}/>
<TextInput style={styles.searchBox} placeholder="Height [cm]" onChangeText={setHeight}/>
<TextInput style={styles.searchBox} placeholder="Age" onChangeText={setAge}/>
<TextInput style={styles.searchBox} placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={setISF}/>
<TextInput style={styles.searchBox} placeholder="CHO Ratio (grams of CHO per 1 unit) (Optional)" onChangeText={setCHORatio}/>


<AppButton style={styles.button} title="Confirm"
              onPress={() => getData()}
            />

</View> 

    );
    
}

export default PersonalData;