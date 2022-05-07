import React from 'react';
import {View,FlatList,TextInput,Text,Switch,ActivityIndicator,Dimensions } from 'react-native';
import { useState } from 'react';
import styles from './style'
import {Food} from './food'
import {Food_API} from '../../utils/apiQuery';
import { CustomImageButton } from '../../customComponents/customImageButton';
import { Scanner } from '../../customComponents/barcodeScanner';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ScannerPage = ({ navigation }) =>{
    var s=screenWidth*0.8;
    return(
        <View >
            <Text style={styles.scannerText}>Scan the food container barcode to get the nutrient details!</Text>
            <Scanner/>
            

    </View>
  
    );
    
}

export default ScannerPage;