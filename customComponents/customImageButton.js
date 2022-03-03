
import React from 'react';
import { Text, StyleSheet,TouchableOpacity, View, Image } from 'react-native';

const images = {
    plus: {
      uri: require('../assets/plus.png')
    }
  }

export const CustomButton = (
    {   onPress,
        title="Button",
         image="plus",
        style,
        iconStyle
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity onPress={onPress} >
                        <Image source={images[image].uri} style={iconStyle} />
                    </TouchableOpacity>
            </View>
           
        );
}

const styles =  StyleSheet.create({
    appButtonText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});

export default CustomButton;