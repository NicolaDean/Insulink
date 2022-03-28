
import React from 'react';
import {  StyleSheet,TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../constants/appAspect';

const images = {
    plus: {
      uri: require('../assets/plus.png')
    },
    camera: {
        uri: require('../assets/camera.png')
      },
      search: {
          uri: require('../assets/search.png')
        },
        delete: {
            uri: require('../assets/delete.png')
          },
          close: {
              uri: require('../assets/close.png')
            },
            running: {
                uri: require('../assets/running.png')
              },
              soccer: {
                uri: require('../assets/soccer.png')
              },tennis: {
                uri: require('../assets/tennis.png')
              },fitness: {
                uri: require('../assets/fitness.png')
              },basket: {
                uri: require('../assets/basket.png')
              },swimming: {
                uri: require('../assets/swimming.png')
              },more: {
                uri: require('../assets/more.png')
              },less: {
                uri: require('../assets/less.png')
              },
  }

export const CustomButton = (
    {   onPress,
        title="Button",
        image="",
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
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});

export default CustomButton;