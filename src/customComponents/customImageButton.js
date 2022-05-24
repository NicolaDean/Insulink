
import React from 'react';
import {  StyleSheet,TouchableOpacity, View, Image } from 'react-native';
import { buttonIcons } from '../assets/buttonIcons';
import { colors } from '../constants/appAspect';



export const CustomImageButton = (
    {   onPress,
        title="Button",
        image="",
        style,
        iconStyle,
        disabled=false
    }) =>{

        return(
            <TouchableOpacity testID='ImageButton' disabled={disabled} onPress={onPress} style={style}>
                    <View  style={image == 'dose' ?styles.appButtonContainerRound: (image =='glucose' || image== 'statistics'|| image== 'calendar' || image=='defaultDiet' || image=='barcode')? styles.appButtonContainerSquare: null}>
                        <Image source={buttonIcons[image].uri} style={iconStyle} />
                    </View>
            </TouchableOpacity>
           
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
      },appButtonContainerSquare: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical:30,
        paddingHorizontal:30
      }
});

export default CustomImageButton;