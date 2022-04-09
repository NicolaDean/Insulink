import React from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput,View} from 'react-native';
import { colors } from '../../../constants/appAspect';
import { MarginContainer } from "../../../customComponents/containers/marginContainer";

const d = [1,2,3,4,5]

export const PageStepBar = ({step = 1, totStep =5,style ={}}) =>{
    let i=0;
    return (
        <MarginContainer>
            <View style={[styles.container,style]}>
                {d.map( num =>{
                    let s = {}
                    if(num <= step)
                    {
                        s = {backgroundColor:colors.secondary}
                    }
                    return(
                        <View key={num} style={[styles.step,s]}>
                            <Text style={{color:'white'}}>{num}</Text>
                        </View>
                    );  
                })}
            </View>
        </MarginContainer>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    step:{
        marginLeft:5,
        backgroundColor:colors.primary,
        borderRadius:50,
        width:40,
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:1,
    }

})