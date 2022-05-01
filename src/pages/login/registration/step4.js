import React, { useState } from 'react';
import {ScrollView,View,StyleSheet,Text,TextInput} from 'react-native';
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
import { userDataTypes } from '../../../constants/states';

const dummy_data = [
    {x:"Carb"  ,y:50},
    {x:"Fat"   ,y:30},
    {x:"Prot"  ,y:222}];

export const RegStep4 = ({step,setStep,userData,setUserData}) =>{

    const [chartData,setChartData] = useState(dummy_data);

    console.log(JSON.stringify(userData));
    const changeMacro = (macro,value) =>{
        const newChartData = [...chartData];
    const choRatio=0;
        switch(macro){
            case 'Carb':
                newChartData[0] = {x:"Carb"  ,y:value};
                setUserData(userDataTypes.maxCarb,value);
                break;
            case 'Fat':
                newChartData[1] = {x:"Fat"  ,y:value};
                setUserData(userDataTypes.maxFat,value);
                break;
            case 'Prot':
                newChartData[2] = {x:"Prot"  ,y:value};
                setUserData(userDataTypes.maxProt,value);
                break;
                
            default:
                newChartData[0] = {x:"Carb"  ,y:value};
                setUserData(userDataTypes.maxCarb,value);
                break;
        }
        setChartData(newChartData);
    }
    const [loading,setLoading] = useState(true);

    return (
    
                <ScrollView style={{alignContent:'center'}}>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Fitness Objective:"}>
                        <InputContainer name={"Carbohydrates: "}>
                            <Slider value={userData.maxCarb} onValueChange={(value)=>{changeMacro("Carb",value)}} minimumValue={0} maximumValue={600} step={1}/>
                        </InputContainer>
                        <InputContainer name={"Fats: "}>
                            <Slider value={userData.maxFat} onValueChange={(value)=>{changeMacro("Fat",value)}} minimumValue={0} maximumValue={600} step={1}/>
                        </InputContainer>
                        <InputContainer name={"Proteins: "}>
                            <Slider value={userData.maxProt} onValueChange={(value)=>{changeMacro("Prot",value)}} minimumValue={0} maximumValue={600} step={1}/>
                        </InputContainer>
                        <InputContainer style={{alignSelf:'center'}}>
                             <View >
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

                        <InputContainer name={"CHO Ratio (optional): "}>
                            <Slider value={userData.choratio} onValueChange={(value)=>{setUserData(userDataTypes.choratio,value)}} minimumValue={0} maximumValue={100} step={1}/>
                            <Text style={{alignSelf:'center',color:'white',fontSize:20,marginBottom:20}}>{userData.choratio}</Text>
                        </InputContainer>

                        <InputContainer name={"ISF (optional): "}>
                            <Slider value={userData.isf} onValueChange={(value)=>{setUserData(userDataTypes.isf,value)}} minimumValue={0} maximumValue={600} step={1}/>
                            <Text style={{alignSelf:'center',color:'white',fontSize:20,marginBottom:20}}>{userData.isf}</Text>
                        </InputContainer>

                    </InputBlock>
                </ScrollView>
        
        
    );
}


const styles = StyleSheet.create({

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