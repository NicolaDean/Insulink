//LIBRARY IMPORT
import React, { useState } from 'react';
import {View, TextInput,Text,StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';

//GUI IMPORT
import CustomButton from '../../customComponents/customButton';

//REDUX IMPORT
import { editUserData } from '../../stateManager/reduxStates/actions/userAction';
import { userDataTypes } from '../../constants/states';
import { steps } from '../../constants/registrationSteps';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { RegStep1 } from '../login/registration/step1';
import { RegStep2 } from '../login/registration/step2';
import { RegStep3 } from '../login/registration/step3';
import { RegStep4 } from '../login/registration/step4';
import { PageStepBar } from '../login/registration/pageStepBar';
import { Row } from '../login/registration/utilityComponents';


export const EditPersonalData = ({ navigation,status }) =>{
    
    
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(status.userData);
    const [errors,setErrors] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [step,setStep] = useState(2);
    const [waitRegConfirm,setRegConfirmWait] = useState(false);

    const setInputField = (type,data) =>{
        setUserData(state =>({...state,[type]: data}));
    }

    const saveData = async () => {
      //TODO CHANGE STATE

      console.log(userData);
      dispatch(editUserData(userData));
      
      //navigate back to Personal Data
      navigation.navigate('PersonalData',{})
    }

    const nextStep = () =>{
        setStep(step => step +1);
    }

    const prevStep = () =>{
        setStep(step => step -1);
    }
    
    //TODO CREATE A GLOBAL STATE FOR ALL STEPS THAT CONTAIN USER DATA
    const renderStep = () =>{
        switch(step){
            case steps.personal_info: 
                return (<RegStep2 userData={userData} setUserData={setInputField}/>);
            case steps.phisical_info: 
                return (<RegStep3 userData={userData} setUserData={setInputField}/>);
            case steps.diet_info: 
                return (<RegStep4 userData={userData} setUserData={setInputField}/>);
            case steps.complete: 
                {
                    setStep(step=>steps.personal_info);
                }
            default: return null;
        }
    }

    return (
        <View>
              <View style={styles.container}>
              
                <MarginContainer style={styles.container}>
                    
                    {renderStep()}
            
                    <View style={{flexDirection:'row'}}>
                        {step > 1 ? <CustomButton title='Prev' onPress={prevStep}/> : null}
                        {step < 5 ? <CustomButton title='Next' onPress={nextStep}/> : null}
                    </View>
                    <MarginContainer style={{alignContent:'center',justifyContent:'center'}}>
                        <CustomButton style={{width:'95%'}} onPress={()=>saveData()} title='Save Data'/>
                    </MarginContainer>
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
        justifyContent:'center',
        alignContent:'center'
    },
    step:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },
});

const mapStateToProps = (state, ownProps = {}) => {
    return{status: state.userReducer};
  }

export default connect(mapStateToProps)(EditPersonalData);