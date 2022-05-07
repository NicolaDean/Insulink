'use strict';

import React, { Component ,useState} from 'react';

import {View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { color } from 'react-native-reanimated';
import { colors } from '../constants/appAspect';
import CustomButton from './customButton';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export const Scanner=()=> {


  const [error,setError]=useState(false)
  const [errorMSG,setErrorMSG]=useState('')
  const[flash,setFlash]=useState(RNCamera.Constants.FlashMode.auto)
   //setFlash(RNCamera.Constants.FlashMode.on)
   //setFlash(RNCamera.Constants.FlashMode.off)

  const onSuccess = (e) =>{
      /*
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
    */

    /*
   if(1){
     // Make a constraint 
        //Call API with the code
    console.log(e.data)
   }
   else{
    setErrorMSG(e.data)
    setError(true)
   }
 */
  setErrorMSG(e.data)
  setError(true)
};



 const showError=(e)=>
{
    return(
      <View style={{    top:screenHeight*0.5,      }}>
              <View style={styles.errorContainer}>
       <Text style={styles.errorMessage}>
         The code <Text style={[styles.errorMessage,{fontWeight: '500',}]}>{errorMSG}</Text> is not supported!</Text>        
          </View>

        <CustomButton title='OK' onPress={()=> {setError(false)} } style={{alignSelf:'center',width:screenWidth*0.35}}/>

      </View>
        
    );
}
 
    return (
        <View style={{flexDirection:'column'}}>
      <QRCodeScanner
      cameraStyle={{borderStyle: 'solid',
      borderWidth: 8,borderColor:colors.primary,overflow: 'hidden',alignSelf:'center',height:screenWidth*0.7,width:screenWidth*0.7,borderRadius:10}}
        onRead={onSuccess}
        flashMode={flash}
        reactivate={true}
        reactivateTimeout={3000}
        containerStyle={{justifyContent:'space-evenly'}}
        topContent={
          null
        }
        bottomContent={
          null
        }
      />
      <View >
      {error==true? showError():null}
      </View>
      </View>
    );

  
   
  
}
const styles=StyleSheet.create({
  errorContainer:{
    backgroundColor:'#FACB0F',
    width:screenWidth*0.8,
    alignSelf:'center',
    borderRadius:8
  },
  errorMessage:{ 
    margin:10,
    alignSelf:'center',
    fontSize:screenWidth/18,
    width:screenWidth*0.85,
    borderRadius:8
     
  }
});
