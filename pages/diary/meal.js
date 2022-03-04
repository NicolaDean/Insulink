
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar} from 'react-native';
import styles from './style'

import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import React,{ useState,useEffect, useContext } from 'react';

import { MealDataContext } from '../../stateManager/mealsDataProvider';
import CustomButton from '../../customComponents/customButton';

const mealIcons ={
    breakfast: {uri:require("../../assets/breakfast.png")},
    lunch:{uri:require("../../assets/lunch.png")},
    dinner:{uri:require("../../assets/dinner.png")},
    snack:{uri:require("../../assets/snack.png")},
}

//IDEA:
/*
EACH MEAL HAS AN ID
WHEN I CLICK ON THE + button i pass the id as props so that i can add food to the global context of that meal
*/
export const Meal = ({navigation,name = "", icon = "breakfast", id}) => {
    
    //const {mealType,foodList} = useContext(MealDataContext);

    //const [currentMealType,setMealType] = mealType;
    const [currentMealType,setMealType] = useContext(MealDataContext);

    setMealType("PASTOO CASUALE");

    const addFoods = () =>{
        console.log("Click from: " + id);

        setMealType(id);
        console.log("Current Meal:" + currentMealType);
        //navigation.navigate('FoodSearch',{mealType: currentMealType});
    }

    return (
        <TouchableOpacity  style={styles.mealContainer} onPress={addFoods}>
                <Image source={mealIcons[icon].uri} style={styles.mealImage} />
                <Text style={styles.mealName}>{name}</Text>
                <View style={styles.addBox}>
                    <Image source={require('../../assets/plus.png')} style={styles.addIcon} />
                </View>
        </TouchableOpacity>

       
    );
   

}

export default Meal;