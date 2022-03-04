import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar} from 'react-native';
import styles from './style'

import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomImageButton from '../../customComponents/customImageButton';
import CustomButton from '../../customComponents/customButton';
import { exp } from 'react-native/Libraries/Animated/Easing';

import Meal from './meal';


export const MealDiary = ({navigator}) =>{

return (
 
<View>
    <Meal name ="Colazione" icon ="breakfast" />
    <Meal name ="Pranzo" icon ="lunch" />
    <Meal name ="Cena" icon ="dinner" />
    <Meal name ="Snack" icon ="snack" />
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>
    
/** */
export default MealDiary;

