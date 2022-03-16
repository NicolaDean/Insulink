import React from 'react';
import {View,FlatList,TextInput,Switch } from 'react-native';
import { useState } from 'react';
import styles from './style'
import {Food} from './food'
import * as api from '../../utils/apiQuery';
import CustomImageButton from '../../customComponents/customImageButton'



export const FoodSearch = ({ navigation }) =>{

  const [foodData, setData] = useState([]);
  const [foodSelected, setFood] = useState("apple");
  const [apiSelected, setApi] = useState(false);

  //Define a function to retrive date from API
  const getData = async () => 
  {
    try 
    {
      //GET API DATA
      const json = (await api.getFoodListAlternative(foodSelected));  
      setData(json.common);
   } 
   catch (error) 
   {
     console.error(error);
   } 
   finally {
     //setLoading(false); //TODO
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
                <Food style={styles.food} data = {item} nav = {navigation} api={apiSelected} activeView={true}></Food>
              )}
            />

</View>
  
    );
    
}

export default FoodSearch;