
import React from 'react';
import {  StyleSheet,TouchableOpacity, View, Image } from 'react-native';
import { buttonIcons } from '../assets/buttonIcons';
import { colors } from '../constants/appAspect';



export const CustomImageButton = (
    {   onPress,
        title="Button",
        image="",
        style,
        iconStyle
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity onPress={onPress} >
                        <Image source={buttonIcons[image].uri} style={iconStyle} />
                    </TouchableOpacity>
            </View>
           
        );
}

const styles =  StyleSheet.create({
    appButtonText:{
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});

export default CustomImageButton;