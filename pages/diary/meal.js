import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar} from 'react-native';
import styles from './style'

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.production.min';

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
export const Meal = ({name = "", icon = "breakfast"}) => {
    
    return (
        <TouchableOpacity style={styles.mealContainer}>
            <Image source={mealIcons[icon].uri} style={styles.mealImage} />
            <Text style={styles.mealName}>{name}</Text>
            <View style={styles.addBox}>
                <Image source={require('../../assets/plus.png')} style={styles.addIcon} />
            </View>
        </TouchableOpacity>

    );
   

}

export default Meal;