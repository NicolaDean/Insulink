import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { buttonIcons, buttonIconsNames } from '../../../assets/buttonIcons';
import { colors } from '../../../constants/appAspect';
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


export const RegStep2 = ({step,setStep}) =>{

    const [gender,setGender] = useState("male");
    const [loading,setLoading] = useState(true);

    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                <Text style={styles.step}>STEP {step}/5:</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Personal Data:"}>
                        <InputContainer name={"Name: "}>
                            <TextInput style={styles.textInput} />
                        </InputContainer>
                        <InputContainer name={"Surname: "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>
                        <InputContainer name={"Gender: "} childrenStyle={styles.genders}>
                            <Gender gender={buttonIconsNames.male} selected={gender} setGender={setGender}/>
                            <Gender gender={buttonIconsNames.female} selected={gender} setGender={setGender}/>
                            <Gender gender={buttonIconsNames.nonbinary} selected={gender} setGender={setGender}/>
                        </InputContainer>
                        <InputContainer name={"Birthday: "}>
                            <TextInput style={styles.textInput}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Next' onPress={()=>{setStep(step+1)}}/>
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
    },
    genders:{
        flexDirection:'row'
    }
})