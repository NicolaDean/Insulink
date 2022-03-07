import React from 'react';
import {TouchableOpacity, Text, SafeAreaView,View,FlatList,Button,TextInput, StyleSheet,Switch } from 'react-native';
import { useState,useEffect } from 'react';
import styles from './style'
import {Food} from './food'
import * as api from '../../utils/apiQuery';
import CustomButton from '../../customComponents/customButton'
import CustomImageButton from '../../customComponents/customImageButton'
import axios from 'axios';
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
    if(!apiSelected){
      json = (await api.getFoodListAlternative(foodSelected));
      //console.log("UFF:" + json);     
      setData(json.common);
    }
    else{
      json = (await api.getIngredentList(foodSelected));
      setData(json.results);
    }
      

  //SET DATA
     //

  //HANDLING ERRORS
   } catch (error) {
     console.error(error);
   } finally {
     //setLoading(false);
   }
  }
  

    return (
       <View >
           
           <View style={styles.header}>
              <TextInput style={styles.searchBox} placeholder="insert food!" onChangeText={setFood}/>
              <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={apiSelected ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>setApi(previousState => !previousState)}
                  value={apiSelected}
              />
              <CustomImageButton image='search'  iconStyle={styles.LogoSize} title="Get Data"
              onPress={() => getData()} />
           
            <CustomImageButton image='camera'   iconStyle={styles.LogoSize}
              onPress={() => getData()}
            />

           </View>

           <FlatList 

            data={foodData}
              numColumns={3}
            renderItem={({ item }) => (
                <Food style={styles.food} data = {item} nav = {navigation} api={apiSelected}></Food>
              )}
            />

</View>
  
    );
    
}

export default FoodSearchExample;

//TODO FIX GRID 
/*
<FlatList

            data={foodData}
              numColumns={3}

            renderItem={({ item }) => (
              
            <Food data = {item} nav = {navigation}></Food>)}
        />
        */