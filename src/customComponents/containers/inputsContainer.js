import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import { colors } from '../../constants/appAspect';

export const InputContainer = ({children,name}) =>{

    return(
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.children}>
                {children}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginTop:10,
        flexDirection:'column',
        justifyContent:'center',
    },
    name:{
        fontSize:18,
        fontWeight:'600',
        /*alignSelf:'center'*/
        marginLeft:10,
        color:colors.primary,
    },
    children:{

    }
})