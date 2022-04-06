import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import {  buttonIconsNames } from '../assets/buttonIcons';
import CustomImageButton from './customImageButton';

const nullLambda = () =>{};

export const CustomNumberPicker = ({
    initialValue = 0,
    onChange = nullLambda,
    style,
}) =>{

    const [value,setValue] = useState(initialValue);

    const changeValue = (value) =>{
        try{
            setValue(parseInt(value));
            onChange(value);
        }catch(error){
            //PRINT ERROR TODO
        }
    }

    return(
        <View style={styles.container}>
            <CustomImageButton image={buttonIconsNames.less} iconStyle={styles.buttonIcon}/>
            <TextInput keyboardType="numeric" onChange={changeValue} style={styles.input}/>
            <CustomImageButton image={buttonIconsNames.more} iconStyle={styles.buttonIcon}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignContent:'center',
        width:100,
        height:30,
    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'black',
       width:30,
       fontSize:18
    },
    buttonIcon:{
        width:25,
        height:25
    }

})