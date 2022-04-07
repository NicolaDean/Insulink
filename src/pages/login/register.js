import React, { useState } from 'react'
import { View ,Text } from 'react-native';
import { RegStep1 } from './registration/step1';
import { RegStep2 } from './registration/step2';
import { RegStep3 } from './registration/step3';
import { RegStep4 } from './registration/step4';

//CUSTOM COMPONENTS

//REDUX

export const Registration = ({}) =>{

    const [step,setStep] = useState(3);

    const renderStep = () =>{

        switch(step){
            case 1: return (<RegStep1 step={step} setStep={setStep} />);
            case 2: return (<RegStep2 step={step} setStep={setStep} />);
            case 3: return (<RegStep3 step={step} setStep={setStep} />);
            case 4: return (<RegStep4 step={step} setStep={setStep} />);
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