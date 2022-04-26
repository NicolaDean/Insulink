import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View,ActivityIndicator} from 'react-native';

export const WaitLoading = ({children,loadingState=[loading,setLoading],customLoad=null,style={}}) =>{

    const [loading,setLoading] = loadingState;

    console.log("IS L:  " + loading);
    if(customLoad == null) customLoad = (
                                            <ActivityIndicator/>
                                        );

    const loadingCircle = () =>{
        return customLoad;
    }
    
    return(
        <View>
            {loading ? (loadingCircle()) : (children)}
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginLeft:'5%',
        marginTop:10,
    }
})