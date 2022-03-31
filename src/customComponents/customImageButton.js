
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
                    <TouchableOpacity onPress={onPress} style={image == 'dose' ?styles.appButtonContainerRound:null}>
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
      },appButtonContainerRound: {
        elevation: 8,
        height:64, 
        width:64,
        backgroundColor: colors.primary,
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginRight:7
      }
});

export default CustomImageButton;