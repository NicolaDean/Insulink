import React from 'react';
import { StyleSheet,Text,View,Image,Dimensions } from 'react-native';
import { colors } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton';
import { localStorage } from '../../utils/localStoreManager';

export const CustomHeader = (props) =>{
    const screenWidth = Dimensions.get("window").width;

    return(
    <View style={{flexDirection:'column',alignItems:'center'}}>
        <Text style={{color:'black',fontSize:screenWidth/15,fontWeight:'bold',alignSelf:'center'}}>{props.children}</Text>
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