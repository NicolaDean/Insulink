import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { buttonIcons, buttonIconsNames } from '../../../assets/buttonIcons';
import { colors } from '../../../constants/appAspect';
import { userDataTypes } from '../../../constants/states';
import { InputBlock } from '../../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../../customComponents/containers/inputsContainer';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';
import { WaitLoading } from '../../../customComponents/containers/waitLoading';
import CustomButton from '../../../customComponents/customButton';
import CustomImageButton from '../../../customComponents/customImageButton';
import { CustomNumberPicker } from '../../../customComponents/customNumberPicker';
import { PageStepBar } from './pageStepBar';


const Gender = ({gender,selected,setGender}) =>{

    const style = {
        backgroundColor:(selected==gender) ? colors.primary:null,
        width:70,
        height:70,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    }
        
    return(
        <View style={style}>
            <CustomImageButton iconStyle={{width:50,height:50}} style={{}} onPress={()=>{setGender(gender)}} image={gender}/>
        </View>
    );
}


export const RegStep2 = ({step,setStep,userData,setUserData}) =>{

    const [loading,setLoading] = useState(true);

    const setUserGender = (gender) =>{
        setUserData("gender",gender);
    }

    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                <Text style={styles.step}>STEP {step}/5:</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Personal Data:"}>
                        <InputContainer name={"Name "}>
                            <TextInput value={userData.name} style={styles.textInput} onChangeText={val => setUserData(userDataTypes.name,val)}/>
                        </InputContainer>
                        <InputContainer name={"Surname "}>
                            <TextInput value={userData.surname} style={styles.textInput} onChangeText={val => setUserData(userDataTypes.surname,val)}/>
                        </InputContainer>
                        <InputContainer name={"Gender "} childrenStyle={styles.genders}>
                            <Gender gender={buttonIconsNames.male} selected={userData.gender} setGender={setUserGender}/>
                            <Gender gender={buttonIconsNames.female} selected={userData.gender} setGender={setUserGender}/>
                            <Gender gender={buttonIconsNames.nonbinary} selected={userData.gender} setGender={setUserGender}/>
                        </InputContainer>
                        <InputContainer name={"Birthday  "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <View style={{flexDirection:'row'}}>
                    <CustomButton title='Prev' onPress={()=>{setStep(step-1)}}/>
                    <CustomButton title='Next' onPress={()=>{setStep(step+1)}}/>
                </View>

                
                <PageStepBar step={step} style={styles.stepBar}/> 
            </MarginContainer>
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