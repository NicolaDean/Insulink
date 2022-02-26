import React from 'react';
import {TouchableOpacity, Text, View,FlatList,Button,TextInput, StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
import styles from './style'
import {Food} from './food'
import * as api from '../utils/apiQuery';
import CustomButton from '../../customComponents/customButton'

export const FoodSearchExample = ({ navigation }) =>{

//HOW WORKS USESTATE -> [var,functionName] = useState(init) 
// it create a function (functionName) usable to update the variable (var) and set an initial value (init)
  
  const [foodData, setData] = useState([]);
  const [foodSelected,setFood] = useState("apple");


  //Define a function to retrive date from API
  const getData = async () => {
    try {
  //GET API DATA
     const json = (await api.getIngredentList(foodSelected));
  //SET DATA
     setData(json.results);
  //HANDLING ERRORS
   } catch (error) {
     console.error(error);
   } finally {
     //setLoading(false);
   }
  }
  
    return (
       <View style={styles.sectionContainer}>
           <TextInput style={styles.searchBox} placeholder="insert food!" onChangeText={setFood}/>

           <CustomButton style={styles.button} title="Get Data"
              onPress={() => getData()}
            />

            <FlatList
            data={foodData}
            renderItem={({ item }) => (
            <Food data = {item} nav = {navigation}></Food>
          )}
        />
       </View> 
    );
    
}

export default FoodSearchExample;