import React from 'react';
import { StyleSheet,Text,View,Image } from 'react-native';
import { colors } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton';

export const CustomHeader = (props) =>{
    return(
    <View style={{marginLeft:'45%',flexDirection:'column',alignItems:'center'}}>
        <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>{props.children}</Text>
    </View>
      
    );
  }

  /*
    headerLeft: () => (
        <CustomImageButton  image='return' iconStyle={{ width: 30, height: 30 }}/>
),
  */


export const header = { 
    headerTitle: (props) => <CustomHeader {...props} />,

    headerRight: () => (
        <CustomImageButton  image='settings' style={{marginRight:20}} iconStyle={{ width: 30, height: 30 }}/>
    ),
    headerStyle: {
        backgroundColor: colors.primary,

    },
}

const tabBarIcon = (icon) => ({
    focused,
    color,
    size,
  }) => <Image source={icon.uri} style={{width:40,height:40}}></Image>;

export const bottomNavHeader = (icon) =>{
    let res = {...header}
    res.tabBarIcon = tabBarIcon(icon);

    return res;
}