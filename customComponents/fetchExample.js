import React from 'react';
import { Text, View,FlatList,Button,TextInput, StyleSheet } from 'react-native';

import { useState,useEffect } from 'react';

export const FetchComponent = () =>{
  const apiLink = "https://api.edamam.com/api/food-database/v2/parser?";
  const appId  = "21f2be32";
  const apiKey = "d0e8b5d4eecb5c925ab79b75c85d0583";

  const [foodData, setData] = useState([]);

  const [foodSelected,setFood] = useState("banana");


  const getData = async () => {
    try {
      //Generate the Link to query food using API
     const link = getUrl(foodSelected);
     //Generating POST request to API
     const response = fetch(link);
     //WAITING response from API
     const json = await (await response).json();
     //SAVING data into the state variable
     setData(json.hints.slice(0,10));
     //-------------------------------------
  //HANDLING ERRORS
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
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
            <Text>{item.food.label},{item.food.category}, {item.food.categoryLabel}</Text>
          )}
        />
       </View> 
    );
    
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
export default FetchComponent;