import React from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { InputBlock } from '../../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../../customComponents/containers/inputsContainer';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';
import { CustomNumberPicker } from '../../../customComponents/customNumberPicker';
import { PageStepBar } from '../../../customComponents/pageStepBar';

export const RegStep3 = () =>{

    return (
        
        <MarginContainer>
            <PageStepBar step={3}/>
            <Text style={styles.step}>STEP 3/5:</Text>
            <View>
                <Text style={styles.title}></Text>
                <InputBlock name={"Personal Data:"}>
                        <InputContainer name={"Name: "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>
                        <InputContainer name={"Surname: "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>

                </InputBlock>
                <InputBlock name={"Phisical Info:"}>
                    <InputContainer name={"Weight: "}>
                        <CustomNumberPicker/>
                    </InputContainer>

                    <InputContainer name={"Height: "}>
                        <CustomNumberPicker/>
                    </InputContainer>
                </InputBlock>

                
            </View>
                
        </MarginContainer>
        
    );
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginLeft:'5%',
        marginTop:10,
    },
    step:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:'gray',
        height:30,
        width:150,
        marginLeft:'5%'
    }
})