import React from 'react';
import { StyleSheet,Text,View,Image } from 'react-native';
import { colors } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton';

export const CustomHeader = (props) =>{
    return(
    <View style={{}}>
        <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>{props.children}</Text>
    </View>
      
    );
  }

export const header = { 
    headerTitle: (props) => <CustomHeader {...props} />,
    headerStyle: {
        justifyContent:'center'
    },
    headerLeft: () => (
        <CustomImageButton  image='return' iconStyle={{ width: 30, height: 30 }}/>
),
    headerRight: () => (
        <CustomImageButton  image='settings' iconStyle={{ width: 30, height: 30 }}/>
    ),
  headerStyle: {
    backgroundColor: colors.primary,
  },
}