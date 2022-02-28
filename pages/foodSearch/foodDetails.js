import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar  } from 'react-native';
import { useState } from 'react';
import styles from './style'

import { foodDetails } from '../utils/testingJsons';//Default food

import * as api from "../utils/apiQuery";
import { VictoryPie } from 'victory-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';

import colors from '../utils/colorPalette'
import CustomButton from '../../customComponents/customButton';
import SelectDropdown from 'react-native-select-dropdown'
import { PieChart } from 'react-native-chart-kit';

const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset;

export const FoodDetails = ({navigator,route}) =>{

    let id = route.params.id.id;

    const [details, setDetails] = useState(foodDetails);
    const [unit,setUnit] = useState('g');
    const [amount,setAmount] = useState('100');

    const getData = async (id)=>
    {
        const res = (await api.getIngredientDetails(id));
        
        setDetails(res);
    }

    getData(id);

    const image = api.imgUrl + details.image;
    const name = details.name;
    const nutrients = api.extractNutrients(details.nutrition.nutrients);
    const properties = api.extractProperties(details.nutrition.properties);
    const units = details.possibleUnits;

    console.log(details.nutrition.nutrients);
    const data = [
        {x:"Carb",y:nutrients["Carbohydrates"].amount },
        { x: "Fat",y:nutrients["Fat"].amount},
        {x: "Prot",y:nutrients["Protein"].amount },
    ]
<<<<<<< HEAD
         
=======

    const chartConfig = {
        
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        
    
  };     
>>>>>>> 9f73c65337043052865b51fd9123214858978eab
    //TODO CREATE CHART WITH NUTRIENTS
    return (
       <ScrollView style={{
        width : '100%',
        height :'100%',
    }}  
       >

           <StatusBar />

           <View style={styles.sectionContainer} >
                <Image style={styles.foodImage} source={{uri:image}}/>

                <View >
                    <Text style ={styles.sectionTitle}> {name}</Text>
<<<<<<< HEAD
                    <View style={{flexDirection:'column',alignSelf:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
=======
                    <View style={{flexDirection:'column',margin:5}}>
                        <View style={{flexDirection:'row',margin: 5}}>
>>>>>>> 9f73c65337043052865b51fd9123214858978eab
                            <Text > Unit:</Text>
                            <SelectDropdown buttonStyle = {{height:30,width:100}} data={units} onSelect={(selectedItem, index) => {
		                                console.log(selectedItem, index);
	                                }}/>
                        </View>
                        <View style={{flexDirection:'row',margin: 5}}>
                            <Text > Amount:</Text>
                            
                            <TextInput placeholder='amount' keyboardType="numeric"/>
                       </View>
                       
                    </View>
                </View>
                
           </View>
           
<<<<<<< HEAD
           <View style={styles.bodySection}>
       
=======
           <View style={{
       alignItems: 'center'}} >
           <PieChart 
            data={xxx}
            width={screenWidth+10}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}

            backgroundColor={"#ffa726"}
            
            
            style={{
                marginVertical: 8,
                borderRadius: 17
              }}
            paddingLeft={"10"}

            />
>>>>>>> 9f73c65337043052865b51fd9123214858978eab
                <Text>Calories: {nutrients["Calories"].amount}</Text>
                <View style={styles.graphBox} >
                    <VictoryPie 
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                        data={data}
                        width={200}
                        height={200}
                        innerRadius={30}
                        style={{
                            labels: {
                            fill: 'gray', fontSize: 20, padding: 7,
                        }, }}
                    /> 
                    <View style={styles.graphLegend}> 
                        <Text>Carbohydrates : {nutrients["Carbohydrates"].amount} g</Text>
                        <Text>Fat : {nutrients["Fat"].amount}g</Text>
                        <Text>Protein : {nutrients["Protein"].amount}g</Text>
                    </View>
                </View>
<<<<<<< HEAD
           <CustomButton style={styles.addButton} title="Add To Meal"/>
=======
           <CustomButton title="Add To Meal"/>
           
>>>>>>> 9f73c65337043052865b51fd9123214858978eab
           </View>
           

       </ScrollView>
           
            
           
    );
}


//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}