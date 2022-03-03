
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
        size=""
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity onPress={onPress} style={{}}>
                        <Image source={images[image].uri}  style={{width: 40, height: 40}}  />
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