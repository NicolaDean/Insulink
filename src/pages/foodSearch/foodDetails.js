import React from 'react';
import {Image, Text, View, ScrollView, TextInput, Dimensions, StatusBar  } from 'react-native';
import { useState,useContext } from 'react';
import styles from './style'

import { foodDetails } from '../utils/testingJsons';//Default food

import * as api from "../utils/apiQuery";
import { VictoryPie } from 'victory-native';
import CustomButton from '../../customComponents/customButton';
import SelectDropdown from 'react-native-select-dropdown'
import { MealDataContext } from '../../stateManager/mealsDataProvider';
const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset;

export const FoodDetails = ({navigation,route}) =>{

    let id = route.params.id.id;

    const [details, setDetails] = useState(foodDetails);
    const [unit,setUnit] = useState('g');
    const [amount,setAmount] = useState('100');

    const {mealType,foodList} = useContext(MealDataContext);

    const [currentMealType,setMealType] = mealType;
    const [foods,setFoods] = foodList;

    

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
    const data = [
        {x:"Carb",y:nutrients["Carbohydrates"].amount },
        { x: "Fat",y:nutrients["Fat"].amount},
        {x: "Prot",y:nutrients["Protein"].amount }
    ]
         

    const addFood = () =>{

        var food ={
            id:id,
            name:name,
            image:image,
            carbs:nutrients["Carbohydrates"].amount,
            fat:nutrients["Fat"].amount,
            prot:nutrients["Protein"].amount
        }

        setFoods(list => [...list,food]);

        console.log("LISTA:" + foods);

        navigation.navigate('MealDiary',{});
    }
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
                    <View style={{flexDirection:'column',alignSelf:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
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
           
           <View style={styles.bodySection}>
       
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
           <CustomButton style={styles.addButton} title="Add Food To Meal" onPress={()=>{addFood()}}/>
           </View>
           

       </ScrollView>
    );
}


//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}