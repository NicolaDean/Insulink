import React, { useState } from 'react'
import { View ,Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
import CustomButton from '../../customComponents/customButton';
import { register } from '../../stateManager/reduxStates/actions/userAction';
import { FirebaseQuery } from '../../utils/firebaseQuery';
import login from './login';
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

const errors = {
    step1Error:"",
    step2Error:"",
    step3Error:"",
    step4Error:"",
}

export const Registration = ({navigation}) =>{

    const [userData,setUserData] = useState(initialUserData);
    const [errors,setErrors] = useState(errors);

    const [step,setStep] = useState(1);
    const [waitRegConfirm,setRegConfirmWait] = useState(false);


    const dispatch = useDispatch();

    const setInputField = (type,data) =>{
        setUserData(state =>({...state,[type]: data}));
    }

    const tryRegister = async() => {
        
        try{
            console.log("Try Creating account with " + userData.email + "->" +userData.password );
            setRegConfirmWait(true);
            dispatch(register(userData));
            setRegConfirmWait(false);

        
            navigation.navigate('BottomTab',{});
        }catch{
            
        }
       
    }
    const lastStep = () =>{

        return(
            <WaitLoading loadingState={[waitRegConfirm,setRegConfirmWait]}>
                <CustomButton title='Complete Registration' onPress={tryRegister}/>
            </WaitLoading>
        );
    }

    //TODO CREATE A GLOBAL STATE FOR ALL STEPS THAT CONTAIN USER DATA
    const renderStep = () =>{

        switch(step){
            case 1: return (<RegStep1 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 2: return (<RegStep2 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 3: return (<RegStep3 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 4: return (<RegStep4 step={step} setStep={setStep} userData={userData} setUserData={setInputField}/>);
            case 5: return(lastStep())
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