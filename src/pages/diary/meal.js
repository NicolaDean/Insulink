
import {Image, Text, View,TouchableOpacity} from 'react-native';
import styles from './style'
import React,{ useState,useEffect, useContext } from 'react';

import { MealDataContext } from '../../stateManager/mealsDataProvider';
import CustomButton from '../../customComponents/customButton';
import { useDispatch } from 'react-redux';
import { selectMealType } from '../../stateManager/reduxStates/actions/macroTracker';
import { connect } from 'react-redux';

const mealIcons ={
    breakfast: {uri:require("../../assets/breakfast.png")},
    lunch:{uri:require("../../assets/lunch.png")},
    dinner:{uri:require("../../assets/dinner.png")},
    snack:{uri:require("../../assets/snack.png")},
    cal:{uri:require("../../assets/calories.png")},
    fat:{uri:require("../../assets/fat.png")},
    protein:{uri:require("../../assets/protein.png")},
    carbo:{uri:require("../../assets/carbohydrates.png")},
}

//IDEA:
/*
EACH MEAL HAS AN ID
WHEN I CLICK ON THE + button i pass the id as props so that i can add food to the global context of that meal
*/
export const Meal = ({navigation,name = "", icon = "breakfast", id,diary}) => {
    
    
    const dispatch = useDispatch();
    
    //const [currentMealType,setMealType] = useContext(MealDataContext);
    //setMealType("PASTOO CASUALE");

    let macro = diary.meals[id].macro;

    console.log("macro:" + JSON.stringify(macro));

    const addFoods = () =>{
        
        dispatch(selectMealType(id));

        navigation.navigate('FoodSearch',{});
    }
    
    return (
        <TouchableOpacity  style={styles.mealContainer} onPress={()=>{addFoods()}}>
                <Text style={styles.mealName}>{name}</Text>
                <View style={styles.macroContainer}>
                <Image source={mealIcons['cal'].uri} style={styles.macroImage} />
                <Text>{diary.meals[id].macro['cal'].toFixed(2)}</Text>
                </View>
                <View style={styles.macroContainer}>
                <Image source={mealIcons['carbo'].uri} style={styles.macroImage} />
                <Text>{diary.meals[id].macro['carb'].toFixed(2)}</Text>
                </View>
                <View style={styles.macroContainer}>
                <Image source={mealIcons['fat'].uri} style={styles.macroImage} />
                <Text>{diary.meals[id].macro['fat'].toFixed(2)}</Text>
                </View>
                <View style={styles.macroContainer}>
                <Image source={mealIcons['protein'].uri} style={styles.macroImage} />
                <Text>{diary.meals[id].macro['prot'].toFixed(2)}</Text>
                </View>
                <View style={styles.addBox}>
                    <Image source={require('../../assets/plus.png')} style={styles.addIcon} />
                </View>
        </TouchableOpacity>

       
    );
   

}

//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker};
  }
  
  export default connect(mapStateToProps)(Meal);