import React from 'react';
import {View,FlatList,TextInput,Text,Switch,ActivityIndicator,Dimensions ,Platform,useWindowDimensions } from 'react-native';
import { useState } from 'react';
import styles from './style'
import {Food} from './food'
import {Food_API} from '../../utils/apiQuery';
import { CustomButton } from '../../customComponents/customButton';
import { RNCamera } from 'react-native-camera';
import { colors } from '../../constants/appAspect';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CustomImageButton from '../../customComponents/customImageButton';
import { useDispatch } from 'react-redux';
import { showError } from '../../stateManager/reduxStates/actions/errorAction';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ScannerPage = ({ navigation }) =>{
    var s=screenWidth*0.8;
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
  const [error,setError]=useState(false)
  const [errorMSG,setErrorMSG]=useState('')
  const[flash,setFlash]=useState(RNCamera.Constants.FlashMode.off)
   //setFlash(RNCamera.Constants.FlashMode.on)
   //setFlash(RNCamera.Constants.FlashMode.off)
   const changeFlash=() =>{
       if (flash==RNCamera.Constants.FlashMode.off){
        setFlash(RNCamera.Constants.FlashMode.torch)
         console.log('Flash ON')
       }else{
        setFlash(RNCamera.Constants.FlashMode.off)
        console.log('Flash OFF')

       }
   }
   const dispatch = useDispatch();

   const errorFunc = (e) =>{
      dispatch(showError(e));
   }
   Food_API.errorFunc = errorFunc;

  const onSuccess = async(e) =>{
      /*
    USE THIS METHOD TO OPEN A GIVEN LINK
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
    */
    Food_API.errorFunc = errorFunc;
   const json = (await Food_API.getFoodListBarCode(e.data));  
   var data=json['foods'][0]
   //console.log(JSON.stringify(data))

   if(data["brand_name"]!=null){
       //setFlash(RNCamera.Constants.FlashMode.auto)
       setError(false)
    navigation.navigate('FoodDetails',{data : data,foodInfo:data,editable : false})
   }
   else{
    setErrorMSG(e.data)
    setError(true)
   } 
};


 const showErrors=(e)=>
{
    return(
      <View style={Platform.isPad!=true?{top:screenHeight*0.40}:{top:windowWidth < windowHeight ?windowHeight*0.50:windowHeight*0.35}}>
              <View style={styles.errorContainer}>
       <Text style={styles.errorMessage}>
         Sorry! The food barcode <Text style={[styles.errorMessage,{fontWeight: '500',}]}>{errorMSG}</Text> is not available</Text>        
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
      cameraStyle={{borderStyle: 'solid',borderWidth: 8,borderColor:colors.primary,overflow: 'hidden',alignSelf:'center',height:windowWidth < windowHeight ?windowWidth *0.7:windowWidth *0.3,width:windowWidth < windowHeight ?windowWidth *0.7:windowWidth *0.5,right:screenWidth/15}}
        onRead={onSuccess}
        flashMode={flash}
        reactivate={true}
        reactivateTimeout={3000}
        containerStyle={{justifyContent:'space-evenly'}}
       
      />
                                  <CustomImageButton image='flash' iconStyle={{width: 52, height: 52,position: 'relative',left:windowWidth < windowHeight ?windowWidth/1.22:windowWidth/1.4}} onPress={()=>{changeFlash()}}/>

      <View >
      {error==true? showErrors():null}
      </View>
      </View>            

    </View>
  
    );
    
}

export default ScannerPage;