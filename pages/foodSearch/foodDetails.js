import React from 'react';
import {TouchableOpacity, Text, View,Button, StyleSheet, Dimensions  } from 'react-native';
import styles from './style'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  const marginOffset=10;
  const screenWidth = Dimensions.get("window").width-marginOffset;

import * as api from "../utils/apiQuery";
const debug = false;
export const FoodDetails = ({navigator,route}) =>{

    let id = route.params.id.id;

    const [details, setDetails] = useState(jsonDetailTesting);

    const getData = async (id)=>
    {
        if(debug){
            return jsonDetailTesting;
        }
        const res = (await api.getIngredientDetails(id));
        
        setDetails(res);
    }

    getData(id);

    let image = api.imgUrl + details.image;
    let name = details.name;
    //let nutrients = details.nutrition.nutrients;
    //let image = data.image;
    //let nutrients = data.nutrients;


    //CHART CONFIG AND STYLE
const chartConfig = {
    //General
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
   
    
      //LineChart
  
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
    
    const chartStyle ={
    
      marginRight:marginOffset,
      marginLeft:marginOffset,
      marginVertical: 8,
      borderRadius: 16
    
  };

    //TODO CREATE CHART WITH NUTRIENTS
    return (
        <View>
            <Text style ={{fontSize: 20  }}> {name}</Text>
            <Image style={{width: 200, height: 200}} source={{uri:image}}/>
        </View>
    );
}


const jsonDetailTesting ={
    "id": 9266,
    "original": "pineapples",
    "originalName": "pineapples",
    "name": "pineapples",
    "nameClean": "pineapple",
    "amount": 1.0,
    "unit": "",
    "unitShort": "",
    "unitLong": "",
    "possibleUnits": [
        "piece",
        "slice",
        "fruit",
        "g",
        "oz",
        "cup",
        "serving"
    ],
    "estimatedCost": {
        "value": 299.0,
        "unit": "US Cents"
    },
    "consistency": "solid",
    "shoppingListUnits": [
        "pieces"
    ],
    "aisle": "Produce",
    "image": "pineapple.jpg",
    "meta": [],
    "nutrition": {
        "nutrients": [
            {
                "name": "Calories",
                "amount": 452.5,
                "unit": "cal",
                "percentOfDailyNeeds": 22.63
            },
            {
                "name": "Fat",
                "amount": 1.09,
                "unit": "g",
                "percentOfDailyNeeds": 1.67
            },
            {
                "name": "Saturated Fat",
                "amount": 0.08,
                "unit": "g",
                "percentOfDailyNeeds": 0.51
            },
            {
                "name": "Carbohydrates",
                "amount": 118.74,
                "unit": "g",
                "percentOfDailyNeeds": 39.58
            },
            {
                "name": "Net Carbohydrates",
                "amount": 106.07,
                "unit": "g",
                "percentOfDailyNeeds": 38.57
            },
            {
                "name": "Sugar",
                "amount": 89.14,
                "unit": "g",
                "percentOfDailyNeeds": 99.05
            },
            {
                "name": "Cholesterol",
                "amount": 0.0,
                "unit": "mg",
                "percentOfDailyNeeds": 0.0
            },
            {
                "name": "Sodium",
                "amount": 9.05,
                "unit": "mg",
                "percentOfDailyNeeds": 0.39
            },
            {
                "name": "Protein",
                "amount": 4.89,
                "unit": "g",
                "percentOfDailyNeeds": 9.77
            },
            {
                "name": "Vitamin C",
                "amount": 432.59,
                "unit": "mg",
                "percentOfDailyNeeds": 524.35
            },
            {
                "name": "Manganese",
                "amount": 8.39,
                "unit": "mg",
                "percentOfDailyNeeds": 419.47
            },
            {
                "name": "Fiber",
                "amount": 12.67,
                "unit": "g",
                "percentOfDailyNeeds": 50.68
            },
            {
                "name": "Vitamin B6",
                "amount": 1.01,
                "unit": "mg",
                "percentOfDailyNeeds": 50.68
            },
            {
                "name": "Copper",
                "amount": 1.0,
                "unit": "mg",
                "percentOfDailyNeeds": 49.78
            },
            {
                "name": "Vitamin B1",
                "amount": 0.72,
                "unit": "mg",
                "percentOfDailyNeeds": 47.66
            },
            {
                "name": "Folate",
                "amount": 162.9,
                "unit": "µg",
                "percentOfDailyNeeds": 40.73
            },
            {
                "name": "Potassium",
                "amount": 986.45,
                "unit": "mg",
                "percentOfDailyNeeds": 28.18
            },
            {
                "name": "Magnesium",
                "amount": 108.6,
                "unit": "mg",
                "percentOfDailyNeeds": 27.15
            },
            {
                "name": "Vitamin B3",
                "amount": 4.53,
                "unit": "mg",
                "percentOfDailyNeeds": 22.63
            },
            {
                "name": "Vitamin B5",
                "amount": 1.93,
                "unit": "mg",
                "percentOfDailyNeeds": 19.28
            },
            {
                "name": "Vitamin B2",
                "amount": 0.29,
                "unit": "mg",
                "percentOfDailyNeeds": 17.04
            },
            {
                "name": "Iron",
                "amount": 2.62,
                "unit": "mg",
                "percentOfDailyNeeds": 14.58
            },
            {
                "name": "Calcium",
                "amount": 117.65,
                "unit": "mg",
                "percentOfDailyNeeds": 11.77
            },
            {
                "name": "Vitamin A",
                "amount": 524.9,
                "unit": "IU",
                "percentOfDailyNeeds": 10.5
            },
            {
                "name": "Zinc",
                "amount": 1.09,
                "unit": "mg",
                "percentOfDailyNeeds": 7.24
            },
            {
                "name": "Phosphorus",
                "amount": 72.4,
                "unit": "mg",
                "percentOfDailyNeeds": 7.24
            },
            {
                "name": "Vitamin K",
                "amount": 6.34,
                "unit": "Âµg",
                "percentOfDailyNeeds": 6.03
            },
            {
                "name": "Selenium",
                "amount": 0.91,
                "unit": "Âµg",
                "percentOfDailyNeeds": 1.29
            },
            {
                "name": "Vitamin E",
                "amount": 0.18,
                "unit": "mg",
                "percentOfDailyNeeds": 1.21
            }
        ],
        "properties": [
            {
                "name": "Glycemic Index",
                "amount": 58.67,
                "unit": ""
            },
            {
                "name": "Glycemic Load",
                "amount": 62.23,
                "unit": ""
            }
        ],
        "caloricBreakdown": {
            "percentProtein": 3.88,
            "percentFat": 1.94,
            "percentCarbs": 94.18
        },
        "weightPerServing": {
            "amount": 905,
            "unit": "g"
        }
    },
    "categoryPath": [
        "tropical fruit",
        "fruit"
    ]
  }
//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}