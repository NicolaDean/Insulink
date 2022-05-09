import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { colors } from '../../../constants/appAspect';
import { userDataTypes } from '../../../constants/states';
import { InputBlock } from '../../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../../customComponents/containers/inputsContainer';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';
import { WaitLoading } from '../../../customComponents/containers/waitLoading';
import CustomButton from '../../../customComponents/customButton';
import { CustomNumberPicker } from '../../../customComponents/customNumberPicker';
import { GoogleButton } from '../socialLogin/googleLogin';
import { PageStepBar } from './pageStepBar';

export const RegStep1 = ({userData,setUserData}) =>{

    //const [step,setStep] = state;
    const [loading,setLoading] = useState(true);

    return (

        <View>
            <Text style={styles.title}></Text>
            <InputBlock name={"Login Info:"}>
                <InputContainer name={"Email  "}>
                    <TextInput value={userData.email} style={styles.textInput} keyboardType="email-address" onChangeText={val => setUserData(userDataTypes.email,val)}/>
                </InputContainer>
                <InputContainer name={"Password  "}>
                    <TextInput  style={styles.textInput} secureTextEntry={true} onChangeText={val => setUserData(userDataTypes.password,val)}/>
                </InputContainer>
            </InputBlock>
           
        </View>
        
        
    );
}
const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:colors.light_orange,
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
        backgroundColor:'white',

    },
    stepBar:{
        marginBottom:0
    },
    genders:{
        flexDirection:'row'
    }
})