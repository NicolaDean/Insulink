import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { VictoryPie } from 'victory-native';
import { colors } from '../../../constants/appAspect';
import { InputBlock } from '../../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../../customComponents/containers/inputsContainer';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';
import { WaitLoading } from '../../../customComponents/containers/waitLoading';
import CustomButton from '../../../customComponents/customButton';
import { CustomNumberPicker } from '../../../customComponents/customNumberPicker';
import { PageStepBar } from './pageStepBar';

import {Slider} from '@miblanchard/react-native-slider';

const dummy_data = [
    {x:"Carb"  ,y:30},
    {x:"Fat"   ,y:30},
    {x:"Prot"  ,y:30}];

export const RegStep4 = ({step,setStep}) =>{

    const [chartData,setChartData] = useState(dummy_data);

    const changeMacro = (macro,value) =>{
        let newChartData = [...chartData];
        switch(macro){
            case 'Carb':
                newChartData[0].y = value;
                break;
            case 'Fat':
                newChartData[1].y = value;
                break;
            case 'Prot':
                newChartData[2].y = value;
                break;
            default:
                newChartData[0].y = value;
                break;
        }

        console.log(newChartData);
        setChartData(newChartData);
    }

    console.log("NEW CHART DATA:" + JSON.stringify(chartData));
    const [loading,setLoading] = useState(true);

    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                <Text style={styles.step}>STEP {step}/5:</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Fitness Objective:"}>
                        <InputContainer name={"Carbohydrates: "}>
                            <Slider/>
                        </InputContainer>
                        <InputContainer name={"Fats: "}>
                            <Slider />
                        </InputContainer>
                        <InputContainer name={"Proteins: "}>
                            <Slider />
                        </InputContainer>
                        <InputContainer>
                             <View>
                            <VictoryPie 
                                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                                    data={chartData}
                                    width={200}
                                    height={200}
                                    innerRadius={30}
                                    style={{
                                        labels: {
                                        fill: colors.primary, fontSize: 20, padding: 7,
                                    }, }}
                                /> 
                            </View>
                        </InputContainer>
                    </InputBlock>
                </View>
                
                <CustomButton title='Next' onPress={()=>{changeMacro("Carb",230)}}/>
                <CustomButton title='Next' onPress={()=>{setStep(3)}}/>
                <PageStepBar step={step} style={styles.stepBar}/> 
            </MarginContainer>
        </View>
        
        
    );
}


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