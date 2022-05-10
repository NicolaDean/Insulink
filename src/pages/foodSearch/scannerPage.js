import React from 'react';
import {View,FlatList,TextInput,Text,Switch,ActivityIndicator,Dimensions } from 'react-native';
import { useState } from 'react';
import styles from './style'
import {Food} from './food'
import {Food_API} from '../../utils/apiQuery';
import { CustomButton } from '../../customComponents/customButton';
import { RNCamera } from 'react-native-camera';
import { colors } from '../../constants/appAspect';
import QRCodeScanner from 'react-native-qrcode-scanner';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ScannerPage = ({ navigation }) =>{
    var s=screenWidth*0.8;

  const [error,setError]=useState(false)
  const [errorMSG,setErrorMSG]=useState('')
  const[flash,setFlash]=useState(RNCamera.Constants.FlashMode.auto)
   //setFlash(RNCamera.Constants.FlashMode.on)
   //setFlash(RNCamera.Constants.FlashMode.off)

  const onSuccess = async(e) =>{
      /*
    USE THIS METHOD TO OPEN A GIVEN LINK
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
    */
   const json = (await Food_API.getFoodListBarCode(e.data));  
   var data=json['foods'][0]
   //console.log(JSON.stringify(data))

   if(data["brand_name"]!=null){
    navigation.navigate('FoodDetails',{data : data,foodInfo:data,editable : false})
   }
   else{
    setErrorMSG(e.data)
    setError(true)
   } 
};


 const showError=(e)=>
{
    return(
      <View style={{    top:screenHeight*0.51,      }}>
              <View style={styles.errorContainer}>
       <Text style={styles.errorMessage}>
         The code <Text style={[styles.errorMessage,{fontWeight: '500',}]}>{errorMSG}</Text> is not supported!</Text>        
          </View>

        <CustomButton title='OK' onPress={()=> {setError(false)} } style={{alignSelf:'center',width:screenWidth*0.35}}/>

      </View>
        
    );
}
    return(
        <View >
            <Text style={styles.scannerText}>Scan the food container barcode to get the nutrient details!</Text>
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

    </View>
  
    );
    
}

export default ScannerPage;