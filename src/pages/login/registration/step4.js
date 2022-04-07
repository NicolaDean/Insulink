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

export const RegStep4 = ({step,setStep}) =>{


    const [loading,setLoading] = useState(true);

    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                <Text style={styles.step}>STEP {step}/5:</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Fitness Objective:"}>
                        <InputContainer name={"Name: "}>
                            <TextInput style={styles.textInput} />
                        </InputContainer>
                        <InputContainer name={"Surname: "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Next' onPress={()=>{setStep(3)}}/>
                <PageStepBar step={step} style={styles.stepBar}/> 
            </MarginContainer>
        </View>
        
        
    );
}
/*
 <InputBlock name={"Phisical Info:"}>
                        <InputContainer name={"Weight: "}>
                            <CustomNumberPicker/>
                        </InputContainer>

                        <InputContainer name={"Height: "}>
                            <CustomNumberPicker/>
                        </InputContainer>
                    </InputBlock>
*/
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
    stepBar:{
        marginBottom:0
    }
})