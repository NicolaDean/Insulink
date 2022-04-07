import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { colors } from '../../../constants/appAspect';
import { InputBlock } from '../../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../../customComponents/containers/inputsContainer';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';
import { WaitLoading } from '../../../customComponents/containers/waitLoading';
import CustomButton from '../../../customComponents/customButton';
import { CustomNumberPicker } from '../../../customComponents/customNumberPicker';
import { PageStepBar } from './pageStepBar';

export const RegStep3 = ({step,setStep}) =>{


    const [loading,setLoading] = useState(true);

    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                <Text style={styles.step}>STEP {step}/5:</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Phisical Info:"}>
                        <InputContainer name={"Weight: "}>
                            <CustomNumberPicker style={styles.numberPicker}/>
                        </InputContainer>

                        <InputContainer name={"Height: "}>
                            <CustomNumberPicker style={styles.numberPicker}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Next' onPress={()=>{setStep(step+1)}}/>
                <PageStepBar step={step} style={styles.stepBar}/> 
            </MarginContainer>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'orange'
    },
    step:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },
    textInput:{
        height: 40,
        width:'90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf:'center',
        backgroundColor:colors.primary,

    },
    numberPicker:{
        /*alignSelf:'center'*/
    },
    stepBar:{
        marginBottom:0
    }
})