import React from 'react';
import {Image, Text, View,Button, StyleSheet, Dimensions, StatusBar } from 'react-native';
import styles from './style'

import CustomImageButton from '../../customComponents/customImageButton';
import CustomButton from '../../customComponents/customButton';


import { ScrollView, TouchableHighlight} from 'react-native-gesture-handler';

const marginOffset=10;
const screenWidth = Dimensions.get("window")
var icon=screenWidth*0.2
  

export const MealDiary = ({navigator,route}) =>{

return (
 
<View>

<TouchableHighlight style={styles.mealContainer}>
    <Text style={styles.mealName}>Colazione</Text>
</TouchableHighlight>

<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer} iconStyle={styles.LogoSize}/>
                </View>
    );
}
