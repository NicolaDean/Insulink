import React from 'react';
import { Text, View,FlatList,Button,TextInput, StyleSheet } from 'react-native';

import { useState,useEffect } from 'react';

import {Food} from './food'
import * as api from '../utils/apiQuery';

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
    
     const json = (await api.getIngredentList(foodSelected));
     
     setData(json.results);
  //HANDLING ERRORS
   } catch (error) {
     console.error(error);
   } finally {
     //setLoading(false);
   }
  }
  
  const getUrl = (userInput) =>{
      return apiLink +
            "app_id=" + appId + "&" +
            "app_key=" + apiKey + "&" +
            "ingr=" + userInput;
  }
  
    return (
       <View>
           <Button title="Get Data" onPress={() => getData()}/>

           <TextInput placeholder="insert food" onChangeText={setFood}/>

           <FlatList
            data={foodData}
            renderItem={({ item }) => (
            <Food data = {item} nav = {navigation}></Food>
          )}
        />
       </View> 
    );
    
}//<Food data = {item.food} nav = {navigation}></Food>

const jsonTesting = {
  "results": [
      {
          "id": 19400,
          "name": "banana chips",
          "image": "banana-chips.jpg"
      },
      {
          "id": 93779,
          "name": "banana liqueur",
          "image": "limoncello.jpg"
      }
  ],
  "offset": 0,
  "number": 2,
  "totalResults": 13
}


/*
<FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
*/
export default FoodSearchExample;