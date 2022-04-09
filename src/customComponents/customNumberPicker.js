import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import {  buttonIconsNames } from '../assets/buttonIcons';
import { colors } from '../constants/appAspect';
import CustomImageButton from './customImageButton';

const nullLambda = () =>{};

export const CustomNumberPicker = ({
    initialValue = 0.0,
    onChange = nullLambda,
    currVal = 0,
    style,
}) =>{

    console.log(currVal);

    //TODO SEARCH HOW TO SET VALUE FROM userData
    const [value,setValue] = useState(currVal);
    const [stringVal,setStringVal] = useState(currVal.toString());

    const changeValue = (value) =>{
        try{
            setValue(parseFloat(value));
            setStringVal(value);
            console.log("Change->" + value);
            onChange(value);
        }catch(error){
            //PRINT ERROR TODO
        }
    }

    const add =  () =>{
        console.log("ADD");
    
        let newVal = (value + 0.1);
        //console.log("NEW VAL: " + newVal);
        //newVal = newVal.toFixed(1);
        setStringVal(newVal.toString());
        setValue(newVal);
        onChange(newVal);
    }

    const remove =  () =>{

        let newVal = (value - 0.1);
        //console.log("NEW VAL: " + newVal);
        //newVal = newVal.toFixed(1);
        setStringVal(newVal.toString());
        setValue(newVal);
        onChange(newVal);
    }
    return(
        <View style={[styles.container,style]}>
            <CustomImageButton image={buttonIconsNames.less} iconStyle={styles.buttonIcon} onPress={remove}/>
            <TextInput keyboardType="numeric" onChangeText={changeValue} value={stringVal} style={styles.input}/>
            <CustomImageButton image={buttonIconsNames.more} iconStyle={styles.buttonIcon} onPress={add}/>
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
       height: 40,
       width:'90%',
       textAlign:'center',
       fontSize:18,
       fontSize:20,
       backgroundColor:colors.primary,
    },
    buttonIcon:{
        width:25,
        height:25,
    }

})