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

    const Row = ({children,width}) =>{
        return(
            <MarginContainer style={{flexDirection:'row'}}  width={width}>
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
    return (
        <MarginContainer>
            <Title>Personal Data</Title>

            <Row>
                <MarginContainer width={'50%'}>
                    <Title>Diet Info: </Title>
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
                
            </Row>  
            


            <Row>
                <Row width={'50%'}>
                    <Title>Name: </Title>
                    <Text>{userData.name} {userData.surname}</Text>
                </Row>
                <Row width={'50%'}></Row>
            </Row>
            <Row>
                <Row width={'50%'}>
                    <Icon icon={'weigth'}/>
                    <Text>{userData.weight}</Text>
                </Row>
                <Row width={'50%'}>
                    <Icon icon={'height'}/>
                    <Text>{userData.height}</Text>
                </Row>
            </Row>

            

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
    }
});

const mapStateToProps = (state, ownProps = {}) => {
    return{userData: state.userReducer.userData};
  }

export default connect(mapStateToProps)(PersonalData);