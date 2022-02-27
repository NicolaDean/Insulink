import React from 'react';
import {TouchableOpacity, Text, View,FlatList,Button,TextInput, StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
import styles from './style'
import {Food} from './food'
import * as api from '../utils/apiQuery';
import CustomButton from '../../customComponents/customButton'
import { Switch } from 'react-native-gesture-handler';

export const FoodSearchExample = ({ navigation }) =>{

//HOW WORKS USESTATE -> [var,functionName] = useState(init) 
// it create a function (functionName) usable to update the variable (var) and set an initial value (init)
  
  const [foodData, setData] = useState([]);
  const [foodSelected, setFood] = useState("apple");
  const [apiSelected, setApi] = useState(false);


  //Define a function to retrive date from API
  const getData = async () => {
    try {
  //GET API DATA
  let json = "";
    if(apiSelected)
      json = (await api.getAllRelatedFood(foodSelected));
    else
      json = (await api.getIngredentList(foodSelected));

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
           
           <View style={{flexDirection:'row'}}>
              <TextInput style={styles.searchBox} placeholder="insert food!" onChangeText={setFood}/>
              <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={apiSelected ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>setApi(previousState => !previousState)}
                  value={apiSelected}
              />
           </View>

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