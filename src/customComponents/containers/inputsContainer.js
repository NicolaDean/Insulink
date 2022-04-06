import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';

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
        flex:2,
        flexDirection:'column',
        marginTop:10,
        justifyContent:'center',
    },
    name:{
        fontSize:18,
        fontWeight:'400',
        alignSelf:'center'
    },
    children:{
        alignSelf:'center'
    }
})