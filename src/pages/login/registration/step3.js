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
import { PageStepBar } from './pageStepBar';

export const RegStep3 = ({step,setStep,userData,setUserData}) =>{
// TODO non funziona bene il num picker

    console.log(JSON.stringify(userData));
    const [loading,setLoading] = useState(true);

    return (
        
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Phisical Info:"}>
                        <View style={{marginVertical:'10%'}}>
                        <View style={{marginVertical:'5%'}}>

                        <InputContainer name={"Weight  "}>
                            <CustomNumberPicker style={styles.numberPicker} currVal={userData.weight} onChange={val => setUserData(userDataTypes.weight,val)}/>
                        </InputContainer>
                        </View>

                        <View style={{marginVertical:'5%'}}>

                        <InputContainer name={"Height  "}>
                            <CustomNumberPicker style={styles.numberPicker} currVal={userData.height} onChange={val => setUserData(userDataTypes.height,val)}/>
                        </InputContainer>
                        </View>

                        </View>
                    </InputBlock>
            </View>
        
        
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:colors.light_orange,
        
    },title:{
        alignSelf:'auto',
        fontWeight:'bold',

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
    },
    numberPicker:{
        alignSelf:'center',
        marginTop: 10,
        right:'80%'
        
    }
})