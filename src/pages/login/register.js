import React, { useState } from 'react'
import { View ,Text,StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { steps } from '../../constants/registrationSteps';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
import CustomButton from '../../customComponents/customButton';
import { register } from '../../stateManager/reduxStates/actions/userAction';
import { FirebaseQuery } from '../../utils/firebaseQuery';
import { inputChecker } from '../../utils/inputChecker';
import login from './login';
import { RegistrationErrorPopup } from './registration/errorsPopup';
import { PageStepBar } from './registration/pageStepBar';
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
    const [errors,setErrors] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [step,setStep] = useState(1);
    const [waitRegConfirm,setRegConfirmWait] = useState(false);


    const dispatch = useDispatch();

    const setInputField = (type,data) =>{
        setUserData(state =>({...state,[type]: data}));
    }

    const errorFunction = (error) =>{
        setErrors(error);
        if(JSON.stringify(error) != "[]") {
            setErrorModalVisible(true);
        }
        
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

    const nextStep = () =>{
        if(checkError()){
            setStep(step => step +1);
        } 
    }

    const prevStep = () =>{
        setStep(step => step -1);
    }

    const checkError = () =>{
        return inputChecker.checkRegistrationInputs(userData,step,errorFunction);
    }

    //TODO CREATE A GLOBAL STATE FOR ALL STEPS THAT CONTAIN USER DATA
    const renderStep = () =>{
        switch(step){
            case steps.actual_reg: 
                return (<RegStep1 userData={userData} setUserData={setInputField}/>);
            case steps.personal_info: 
                return (<RegStep2 userData={userData} setUserData={setInputField}/>);
            case steps.phisical_info: 
                return (<RegStep3 userData={userData} setUserData={setInputField}/>);
            case steps.diet_info: 
                return (<RegStep4 userData={userData} setUserData={setInputField}/>);
            case steps.complete: 
                return(lastStep())
            default: return null;
        }
    }

    return (
        <View>
            <RegistrationErrorPopup visibilityFlag={ [errorModalVisible, setErrorModalVisible]} errors={errors}/>
            <View style={styles.container}>
                <MarginContainer style={styles.container}>
                    <Text style={styles.step}>STEP {step}/5:</Text>
                    
                    {renderStep()}
            
                    <View style={{flexDirection:'row'}}>
                        {step > 1 ? <CustomButton title='Prev' onPress={prevStep}/> : null}
                        {step < 5 ? <CustomButton title='Next' onPress={nextStep}/> : null}
                    </View>
                    <PageStepBar step={step} style={styles.stepBar}/> 
                </MarginContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stepBar:{
        marginBottom:0
    },
    container:{
        height:'100%',
        backgroundColor:'orange'
    },
    step:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },
});

export default Registration;