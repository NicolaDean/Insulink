import React from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

    const storeData = async () => {
        try {
          await AsyncStorage.setItem('weight', weight)
        } catch (e) {
          // saving error
        }
      }
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('weight')
          console.log(value)
          if(value !== null) {
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }

return (
    <View style={styles.sectionContainer}>
<TextInput style={styles.searchBox} placeholder="Name" onChangeText={setName}/>        
<TextInput style={styles.searchBox} placeholder="Weight [kg]" onChangeText={setWeight}/>
<TextInput style={styles.searchBox} placeholder="Height [cm]" onChangeText={setHeight}/>
<TextInput style={styles.searchBox} placeholder="Age" onChangeText={setAge}/>
<TextInput style={styles.searchBox} placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={setISF}/>
<TextInput style={styles.searchBox} placeholder="CHO Ratio (grams of CHO per 1 unit) (Optional)" onChangeText={setCHORatio}/>


<CustomButton style={styles.button} title="Confirm"
              onPress={() => storeData()
            
            }
            />

<CustomButton style={styles.button} title="Confirm"
              onPress={() => getData()
              
            }
            />

</View> 

    );
    
}

export default EditPersonalData;