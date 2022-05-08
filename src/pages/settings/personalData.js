import {Text, View, StyleSheet,Image } from 'react-native';
import React,{ useState,useEffect, useContext } from 'react';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//API
import * as database from '../../utils/firebaseQuery'

//REDUX
import { connect } from 'react-redux';
import { loginStatus } from '../../constants/states';
import { InputBlock } from '../../customComponents/containers/inputsBlock';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { VictoryPie } from 'victory-native';
import { colors } from '../../constants/appAspect';
import { buttonIcons } from '../../assets/buttonIcons';



export const PersonalData = ({ navigation, route, userData}) =>{
    
    const [counter,setCounter] = useState(0);
    const chartData = [
        {x:"Carb"  ,y:userData.maxCarb},
        {x:"Fat"   ,y:userData.maxFat},
        {x:"Prot"  ,y:userData.maxProt}];

    const Title = ({children}) =>{
        return(
            <Text style={styles.title}>{children}</Text>
        );
    }

    const Icon = ({icon="plus"}) =>{
        return(
            <Image source={buttonIcons[icon].uri} style={styles.icons} ></Image>
        );
    }

    const Row = ({children,width,style}) =>{
        return(
            <MarginContainer style={[style,{flexDirection:'row'}]}  width={width}>
                {children}
            </MarginContainer>
        );
    }

    const Col = ({children,width}) =>{
        return(
            <MarginContainer style={{flexDirection:'col'}} width={width}>
                {children}
            </MarginContainer>
        );
    }

    const MacroIcon = ({color}) =>{
        return(
            <View style={[styles.macrolegend,{backgroundColor:color}]}/>
        );
    }
    
    return (
        <MarginContainer >
            <Title>Diet Info: </Title>
            <Row style={{backgroundColor:colors.white}}>
                <MarginContainer  width={'50%'}>
                    
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
                </MarginContainer>
                <MarginContainer style={{justifyContent:'center'}}>
                        <Row>
                            <MacroIcon color={'tomato'}/>
                            <Text>Carb: {userData.maxCarb}g</Text>
                        </Row>
                        <Row>
                            <MacroIcon color={'orange'}/>
                            <Text>Fat: {userData.maxFat}g</Text>
                        </Row>
                        <Row>
                            <MacroIcon color={'gold'}/>
                            <Text>Prot: {userData.maxProt}g</Text>
                        </Row>
                </MarginContainer>
            </Row>  
        
            <Text style={styles.userName}>{userData.name} {userData.surname} </Text>
            
            <Title>Physical Info:</Title>
            <MarginContainer style={{backgroundColor:colors.primary}}>
            <Row>
                    
                <Row width={'40%'}>
                    <Icon icon={'weigth'}/>
                    <Text style={styles.phisicInfo}>{userData.weight} Kg</Text>
                </Row>
                <Row width={'50%'}>
                    <Icon icon={'height'}/>
                    <Text style={styles.phisicInfo}>{userData.height} cm</Text>
                </Row>
            </Row>
            </MarginContainer>
            
            <Title>Medical Info:</Title>
            
        </MarginContainer>   
    );

}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    icons:{
        width:60,
        height:60
    },
    field:{
        flexDirection:'row'
    },
    macrolegend:{
        width:30,
        height:30,
        borderRadius:20,
        
    },
    phisicInfo:{
        alignSelf:'center',
        color:colors.white,
        fontSize:20,
        marginLeft:10,
        fontWeight:'bold'
    },
    userName:{
        fontSize:20,
        color:colors.black
    }
});

const mapStateToProps = (state, ownProps = {}) => {
    return{userData: state.userReducer.userData};
  }

export default connect(mapStateToProps)(PersonalData);