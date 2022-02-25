import React from 'react';
import {TouchableOpacity, Text, View,FlatList,Button,TextInput, StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
import styles from './style'
import {Food} from './food'
import * as api from '../utils/apiQuery';
import { DonutChart } from '../utils/chart';

export const FoodSearchExample = ({ navigation }) =>{
  const apiLink = "https://api.edamam.com/api/food-database/v2/parser?";
  const appId  = "21f2be32";
  //const apiKey = "d0e8b5d4eecb5c925ab79b75c85d0583";

  const upc = "017596008299";
  //USE STATE

//HOW WORKS USESTATE -> [var,functionName] = useState(init) 
// it create a function (functionName) usable to update the variable (var) and set an initial value (init)
  
  const [foodData, setData] = useState([]);
  const [foodSelected,setFood] = useState("apple");


  //Define a function to retrive date from API
  const getData =async () => {
    try {
  //GET API DATA
     const json = (await api.getIngredentList(foodSelected));
     console.log(json);
  //SET DATA
     setData(json.results);
  //HANDLING ERRORS
   } catch (error) {
     console.error(error);
   } finally {
     //setLoading(false);
   }
  }
  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>);
  
  const getUrl = (userInput) =>{
      return apiLink +
            "app_id=" + appId + "&" +
            "app_key=" + apiKey + "&" +
            "ingr=" + userInput;
  }
  
    return (
       <View style={styles.sectionContainer}>
           <TextInput style={styles.searchBox} placeholder="insert food!" onChangeText={setFood}/>

           <AppButton style={styles.button} title="Get Data"
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