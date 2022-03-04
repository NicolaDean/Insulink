
import {Image, Text, View,TouchableOpacity} from 'react-native';
import styles from './style'
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
    
    const {mealType,foodList} = useContext(MealDataContext);

    const [foods,setFoods] = foodList;
    const [currentMealType,setMealType] = mealType;
    //const [currentMealType,setMealType] = useContext(MealDataContext);

    console.log(foods);
    //setMealType("PASTOO CASUALE");

    const addFoods = () =>{
        console.log("Click from: " + id);
        setMealType(p => p = id);

        navigation.navigate('FoodSearch',{});
    }

    return (
        <TouchableOpacity  style={styles.mealContainer} onPress={()=>{addFoods()}}>
                <Image source={mealIcons[icon].uri} style={styles.mealImage} />
                <Text style={styles.mealName}>{name}</Text>
                <View style={styles.addBox}>
                    <Image source={require('../../assets/plus.png')} style={styles.addIcon} />
                </View>
        </TouchableOpacity>

       
    );
   

}

export default Meal;