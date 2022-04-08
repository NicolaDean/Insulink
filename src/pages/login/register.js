import React, { useState } from 'react'
import { View ,Text } from 'react-native';
import { RegStep1 } from './registration/step1';
import { RegStep2 } from './registration/step2';
import { RegStep3 } from './registration/step3';
import { RegStep4 } from './registration/step4';

//CUSTOM COMPONENTS

//REDUX
const initialUserData = {
    email:"",
    password:"",
    name:"",
    surname:"",
    gender:"male",
    weight:60,
    height:170,
    birthday:{seconds:0,nanoseconds:0},
    isf:0,
    choratio:0,
    maxCarb:200,
    maxFat:100,
    maxProt:40,
}

export const Registration = ({}) =>{

    const [userData,setUserData] = useState(initialUserData);
    const [step,setStep] = useState(3);


    const setInputField = (type,data) =>{
        setUserData(state =>({...state,[type]: data}));
    }

    //TODO CREATE A GLOBAL STATE FOR ALL STEPS THAT CONTAIN USER DATA
    const renderStep = () =>{

        switch(step){
            case 1: return (<RegStep1 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 2: return (<RegStep2 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 3: return (<RegStep3 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 4: return (<RegStep4 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            default: return null;
        }

    }

    return (
        <View>
            {renderStep()}
        </View>
    );
}

export default Registration;