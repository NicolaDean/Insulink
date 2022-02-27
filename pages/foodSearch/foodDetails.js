import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar  } from 'react-native';
import { useState } from 'react';

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

    const data = [
        {x:"Carb",y:nutrients["Carbohydrates"].amount },
        { x: "Fat",y:nutrients["Fat"].amount},
        {x: "Prot",y:nutrients["Protein"].amount },
    ]

    const chartConfig = {
        //General
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       
    //TODO fit better the chart 
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  },
    barPercentage: 0.5,
    marginRight:marginOffset,
    marginLeft:marginOffset,
    useShadowColorFromDataset: false, // optional
    
  };     
    //TODO CREATE CHART WITH NUTRIENTS
    return (
       <View
        style={{
            width : '100%',
            height :'100%',
            position :'relative',
        }}  
       >

           <StatusBar />

           <View style={styles.headerSection}>
                <Image style={styles.foodImage} source={{uri:image}}/>

                <View style={styles.headerTitle}>
                    <Text style ={styles.sectionTitle}> {name}</Text>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text > Unit:</Text>
                            <SelectDropdown buttonStyle = {{height:30,width:100}} data={units} onSelect={(selectedItem, index) => {
		                                console.log(selectedItem, index);
	                                }}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text > Amount:</Text>
                            
                            <TextInput placeholder='amount' keyboardType="numeric"/>
                       </View>
                       
                    </View>
                </View>
                
           </View>
           
           <View style={styles.bodySection}>
           <PieChart
            data={xxx}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 50]}
            absolute
            />
                <Text>Calories: {nutrients["Calories"].amount}</Text>
                <View style={styles.graphBox}>
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
           <CustomButton style={styles.addButton} title="Add To Meal"/>
           
           </View>
           

       </View>
           
            
           
    );
}
const styles = StyleSheet.create(
    {
        headerSection:{
            marginTop:5,
            borderBottomColor: "red",
            borderBottomWidth: StyleSheet.hairlineWidth,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4

        },
        headerTitle:{
            flexDirection:'row',
            justifyContent:'flex-start'
        },
        sectionTitle:{
            fontSize: 24,
            fontWeight: '600',
            marginTop:20,
            marginLeft:20,
            marginBottom:10
        },
        foodImage:{
            width:200,
            height:200,
            alignSelf:"center",
            marginTop:10
        },
        bodySection:{
            marginTop:10,
            width:"100%"         
        },
        graphBox:{
            marginLeft:"5%",
            width:"90%",
            borderRadius:40,
            backgroundColor:"#F7F7F7",
            flexDirection: 'row',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4
        },
        graphLegend:{
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        addButton:{
           marginTop:10
        },
        dropdown:{
            heigth:"10"
        }
        
        
    }
);

const xxx = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}