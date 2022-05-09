import {Text, View, StyleSheet,Image ,ScrollView} from 'react-native';
import React,{ useState,useEffect, useContext } from 'react';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//API

//REDUX
import { connect, useDispatch } from 'react-redux';
import { loginStatus } from '../../constants/states';
import { InputBlock } from '../../customComponents/containers/inputsBlock';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { VictoryPie } from 'victory-native';
import { colors } from '../../constants/appAspect';
import { buttonIcons } from '../../assets/buttonIcons';
import { localStorage } from '../../utils/localStoreManager';
import { logout } from '../../stateManager/reduxStates/actions/userAction';
import { FirebaseQuery } from '../../utils/firebaseQuery';
import { Icon, MacroIcon, Row, Title } from '../login/registration/utilityComponents';



export const PersonalData = ({ navigation, route, userData}) =>{
    
    const [counter,setCounter] = useState(0);
    const dispatch = useDispatch();
    const chartData = [
        {x:"Carb"  ,y:userData.maxCarb},
        {x:"Fat"   ,y:userData.maxFat},
        {x:"Prot"  ,y:userData.maxProt}];


    const logout_call = () =>{
        dispatch(logout());
        navigation.navigate('Login',{})
    }
    
    return (
        <ScrollView style={{backgroundColor:colors.white,width:'100%',height:'100%'}}>
        <MarginContainer  >
            <Row>
                <Title>Diet Info: </Title>
                <CustomButton onPress={() => logout_call()} title='Logout'/>
            </Row>
            <Row style={styles.macroChart}>
                <MarginContainer  width={'50%'}>
                    
                    <VictoryPie
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                        data={chartData}
                        width={200}
                        height={200}
                        innerRadius={30}
                        style={{
                            labels: {
                                fill: colors.black, fontSize: 20, padding: 7,
                            }, }}
                                /> 
                </MarginContainer>
                <MarginContainer style={{justifyContent:'center',color:colors.white}}>
                        <Row>
                            <MacroIcon color={'tomato'}/>
                            <Text style={styles.macroWrites}>Carb: {userData.maxCarb}g</Text>
                        </Row>
                        <Row>
                            <MacroIcon color={'orange'}/>
                            <Text style={styles.macroWrites}>Fat: {userData.maxFat}g</Text>
                        </Row>
                        <Row>
                            <MacroIcon color={'gold'}/>
                            <Text style={styles.macroWrites}>Prot: {userData.maxProt}g</Text>
                        </Row>
                </MarginContainer>
            </Row>  
        
            <Title>Anagrafic Info:</Title>
            <MarginContainer style={{backgroundColor:colors.primary}}>
                <Text style={styles.userName}>{userData.name} {userData.surname} </Text>
                <Text style={styles.userName}>Born on  {FirebaseQuery.printFormattedDate(userData.birthday,true)}</Text>
            </MarginContainer>
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
            <MarginContainer style={{backgroundColor:colors.primary}}>
            <Row>
                    
                <Row width={'40%'}>
                    <Icon icon={'choratio'}/>
                    <Text style={styles.phisicInfo}>{userData.choratio} g</Text>
                </Row>
                <Row width={'50%'}>
                    <Icon icon={'isf'}/>
                    <Text style={styles.phisicInfo}>{userData.isf} ml/g</Text>
                </Row>
            </Row>
            </MarginContainer>

            <CustomButton onPress={()=>navigation.navigate('EditPersonalData',{})} title='Edit Personal Data'/>
        </MarginContainer>  
        </ScrollView> 
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
    macroWrites:{
        color:colors.black,
        fontWeight:'bold'
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
        color:colors.white
    },
    macroChart:{
        backgroundColor:colors.white,
        color:colors.black
    }
});

const mapStateToProps = (state, ownProps = {}) => {
    return{userData: state.userReducer.userData};
  }

export default connect(mapStateToProps)(PersonalData);