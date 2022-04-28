import React from 'react';
import {View,FlatList,TextInput,Text,Switch,ActivityIndicator,Dimensions } from 'react-native';
import { useState } from 'react';
import styles from './style'
import {Food} from './food'
import {Food_API} from '../../utils/apiQuery';
import { CustomImageButton } from '../../customComponents/customImageButton';


const screenWidth = Dimensions.get("window").width;

export const FoodSearch = ({ navigation }) =>{

  const [foodData, setData] = useState([]);
  const [foodSelected, setFood] = useState("apple");
  const [apiSelected, setApi] = useState(false);
  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");

  const errorFunc = (error) =>{
    console.log("Error during food search: " + JSON.stringify(error));

    setError(error);
  }

  Food_API.setErrorFunc(errorFunc);
  
  //Define a function to retrive date from API
  const getData = async () => 
  {
    try 
    {
      //GET API DATA
      setLoading(true);
      const json = (await Food_API.getFoodListAlternative(foodSelected));  
      setData(json.common);
   } 
   catch (error) 
   {
     console.error(error);
   } 
   finally {
    setLoading(false);
   }
  }
  

  const printFoods = () => {
    return (
      <FlatList 
      contentContainerStyle={{paddingVertical:0,alignItems:'center'}}
      data={foodData}
      numColumns={3}
      renderItem={({ item }) => (
          <Food style={styles.food} data ={item} nav = {navigation} api={apiSelected} deletable={false}></Food>
        )}
      />
    );
  }
    return (
       <View style={{flex:1}}>
           
           <View style={styles.header}>
              <TextInput    adjustsFontSizeToFit
 style={styles.searchBox} placeholder="insert food!" onChangeText={setFood}/>
              <Switch style={{marginVertical:'7%'}} trackColor={{ false: "#767577", true: "#81b0ff" }}
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
           <View style={{flex:1,alignContent:'center'}}>
              {loading ? <ActivityIndicator size="large"/> : printFoods()}
            </View>

</View>
  
    );
    
}

export default FoodSearch;
