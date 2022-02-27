import React from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'

/*Params
var actualGlycemia;
var targetGlycemia;
var carbo;
var proteins;
var fats;
var CHORatio;
var insulineSensitivity;
var limit=180;
var totalInsulineDaily;
var weight
var basal  //backgound insuline daily
*/

//Dose calculator
function MealDose(actualGlycemia,carbo,CHORatio){
    return carbo/Math.floor(CHORatio);
}

function CorrectionDose(actualGlycemia,targetGlycemia,insulineSensitivity){
    return (actualGlycemia-targetGlycemia)/insulineSensitivity;
}

function totalDose(actualGlycemia,carbo,CHORatio,targetGlycemia,insulineSensitivity){
    var mealDose= MealDose(actualGlycemia,carbo,CHORatio);
    var correctionDose=0;
    if (actualGlycemia>=limit){
        correctionDose=CorrectionDose(actualGlycemia,targetGlycemia,insulineSensitivity);
    }
    return mealDose+correctionDose;
}

//Standard prediction funcions (Preferred if inserted from user)

function TotalInsulineDaily(){
    totalInsulineDaily=0,55*weight;
}

function Basal(){
    basal=totalInsulineDaily/2
}

function CHORatioCalculate(){
    CHORatio=500/totalInsulineDaily;
}

function CorrectionFactorCalculate(){
    insulineSensitivity=1800/totalInsulineDaily
}

export const PersonalData = ({ navigation }) =>{

    <CustomButton
                title='Edit'
                onPress={() => navigation.navigate('EditPersonalData',{}) }
            />
            
    //TODO show all user data and put an "add button"
}