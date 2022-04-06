import React from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import { colors } from '../constants/appAspect';
import { MarginContainer } from "./containers/marginContainer";

const d = [1,2,3,4,5]

export const PageStepBar = ({step = 1, totStep =5}) =>{
    let i=0;
    return (
        <MarginContainer>
            <View style={{flexDirection:'row'}}>
                {d.map((i) =>{
                    let s = {}
                    if(i <= step)
                    {
                        s = {backgroundColor:'red'}
                    }
                    return(
                        <View style={[styles.step,s]}>
                            <Text>{i}</Text>
                        </View>
                    );  
                })}
            </View>
        </MarginContainer>
    );
}

const styles = StyleSheet.create({
    step:{
        marginLeft:5,
        backgroundColor:colors.primary,
        borderRadius:50,
        width:30,
        height:30,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'space-around',
        alignItems:'center',
    }
})