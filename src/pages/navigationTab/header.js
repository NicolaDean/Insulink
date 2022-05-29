import React from 'react';
import { StyleSheet,Text,View,Image,Dimensions,Platform } from 'react-native';
import { colors } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton';
import { ErrorPopup } from '../../customComponents/errorPopup';
import { localStorage } from '../../utils/localStoreManager';

export const CustomHeader = (props) =>{
    const screenWidth = Dimensions.get("window").width;

    return(
    <View style={{flexDirection:'column',alignItems:'center'}}>
        {Platform.isPad!=true?
        <Text style={{color:'black',fontSize:screenWidth/14,fontWeight:'bold',alignSelf:'center',top:'18%'}}>{props.children}</Text>
        :
        <Text style={{color:'white',fontSize:screenWidth/20,fontWeight:'bold',top:'8%'}}>{props.children}</Text>}
        <ErrorPopup />
    </View>
    );
  }

  /*
    headerLeft: () => (
        <CustomImageButton  image='return' iconStyle={{ width: 30, height: 30 }}/>
),
  */
const getHeader = (nav) => {
    return {
        headerTitle: (props) => <CustomHeader {...props} />,
    
        headerRight: () => (
            <CustomImageButton  image='settings' style={{marginRight:20}} iconStyle={{ width: 30, height: 30 }}
            onPress={() => nav.navigate('PersonalData',{})}/>
        ),
        headerStyle: {
            backgroundColor: colors.primary,
    
        },
    }
}
export const header  = {
    
}

const tabBarIcon = (icon) => ({
    focused,
    color,
    size,
  }) => <Image source={icon.uri} style={{width:40,height:40}}></Image>;

export const bottomNavHeader = (icon,navigation) =>{
    let res = {...getHeader(navigation)}

    res.tabBarIcon = tabBarIcon(icon);

    return res;
}