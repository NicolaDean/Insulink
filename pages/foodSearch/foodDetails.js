import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar  } from 'react-native';
import { useState } from 'react';

import { foodDetails } from '../utils/testingJsons';//Default food

import * as api from "../utils/apiQuery";
import { VictoryPie } from 'victory-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

import colors from '../utils/colorPalette'

const debug = false;
export const FoodDetails = ({navigator,route}) =>{

    let id = route.params.id.id;

    const [details, setDetails] = useState(foodDetails);

    const getData = async (id)=>
    {
        const res = (await api.getIngredientDetails(id));
        
        setDetails(res);
    }

    getData(id);

    const image = api.imgUrl + details.image;
    const name = details.name;
    const nutrients = api.extractNutrients(details.nutrition.nutrients);

    const data = [
        {x:"Carb",y:nutrients["Carbohydrates"].amount },
        { x: "Fat",y:nutrients["Fat"].amount},
        {x: "Prot",y:nutrients["Protein"].amount },
    ]

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
                <Text style ={styles.sectionTitle}> {name}</Text>
           </View>

           <View style={styles.bodySection}>
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
            
           </View>
           
           <View style={styles.addButton}>
                        <TouchableHighlight>

                        </TouchableHighlight>
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
            marginTop:10            
        },
        graphBox:{
            marginLeft:"5%",
            width:"90%",
            borderRadius:40,
            backgroundColor:"#a8d5ff",
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
            height:"50%",
            justifyContent: 'space-around',
        }
        
        
    }
);

//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}