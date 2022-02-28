import React from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import InsulineCalculator, { calculator } from '../utils/insulineCalculator';

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


export const PersonalData = ({ navigation }) =>{
    
    var calculator = new InsulineCalculator;
    
    return (
            <CustomButton
                title='Edit'
                onPress={() => navigation.navigate('EditPersonalData',{}) }
            />
    );
    
    //TODO create a method to load usefull data from firebase or local storage and call methods of insulineCalculator       
    //TODO show all user data and put an "add button"
}