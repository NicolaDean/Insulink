import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';

export const MarginContainer = ({children,style={}}) =>{

    return(
        <View style={[styles.container,style]}>
            {children}
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