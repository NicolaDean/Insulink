import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import { colors } from '../../constants/appAspect';
import { MarginContainer } from './marginContainer';

export const InputBlock = ({children,name}) =>{

    return(
        <View style={[styles.container]}>
            <MarginContainer>
                <Text style={styles.title}>{name}</Text>
                <View style={[styles.inputs]}>
                    {children}
                </View>
            </MarginContainer>     
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        borderRadius:8,
        backgroundColor:colors.secondary,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    inputs:{
        width:'100%',
        flexDirection:'column',
    }
})