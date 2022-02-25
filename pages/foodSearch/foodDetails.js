import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import { foodDetails } from '../utils/testingJsons';//Default food

import * as api from "../utils/apiQuery";
import { VictoryPie } from 'victory-native';

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
        <View>
            <Text style ={{fontSize: 20  }}> {name}</Text>
            <Image style={{width: 200, height: 200}} source={{uri:image}}/>
            <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={data}
                width={250}
                height={250}
                innerRadius={50}
                style={{
                labels: {
                fill: 'gray', fontSize: 15, padding: 7,
                }, }}
            /> 
        </View>
    );
}



//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}