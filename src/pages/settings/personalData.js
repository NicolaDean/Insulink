import {Text, View, StyleSheet,Image ,ScrollView,Dimensions} from 'react-native';
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
const screenWidth = Dimensions.get("window").width;



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
        <ScrollView style={{backgroundColor:colors.white,}}>
        <MarginContainer  >
            <Row>
               <Title>Diet Info: </Title>
                </Row>
                <Row style={styles.macroChart}>
                <MarginContainer  width={'55%'}>
                    
                    <VictoryPie
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                        data={chartData}
                        width={screenWidth/2}
                        height={screenWidth/2}
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
            </Row >  
        
            <Title>Anagrafic Info:</Title>
            <MarginContainer style={{backgroundColor:colors.primary,borderRadius:8,padding:10,marginVertical:10}}>
                <Text style={styles.userName}>{userData.name} {userData.surname} </Text>
                <Text style={styles.userName}>Born on  {FirebaseQuery.printFormattedDate(userData.birthday,true)}</Text>
            </MarginContainer>
            <Title>Physical Info:</Title>
            <MarginContainer style={{backgroundColor:colors.primary,borderRadius:8,paddingBottom:10,marginVertical:10}}>
            <Row>
                    
                <Row width={'44%'}>
                    <Icon icon={'weigth'}/>
                    <Text style={styles.phisicInfo}>{userData.weight} Kg</Text>
                </Row>
                <Row >
                    <Icon icon={'height'}/>
                    <Text style={styles.phisicInfo}>{userData.height} cm</Text>
                </Row>
            </Row>
            </MarginContainer>
            
            <Title>Medical Info:</Title>
            <MarginContainer style={{backgroundColor:colors.primary,borderRadius:8,paddingBottom:10,marginVertical:10}}>
            <Row>
                    
                <Row width={'45%'} >
                    <Icon icon={'choratio'}/>
                    <Text style={styles.phisicInfo}>{userData.choratio} CHO</Text>
                </Row>
                <Row >
                    <Icon icon={'isf'}/>
                    <Text style={styles.phisicInfo}>{userData.isf} ISF</Text>
                </Row>
            </Row>
            </MarginContainer>
            <CustomButton onPress={()=>navigation.navigate('EditPersonalData',{})} title='Edit Personal Data'/>
            <Row style={{alignSelf:'center'}}>
                    
            <CustomButton onPress={()=>navigation.navigate('Registration',{})} title='Register'/>
            <CustomButton onPress={() => logout_call()} title='Logout'/>
            </Row>
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
        fontWeight:'bold',
        alignSelf:'center'
        ,marginHorizontal:5
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
        color:colors.black,
        justifyContent:'space-between'
    }
});

const mapStateToProps = (state, ownProps = {}) => {
    return{userData: state.userReducer.userData};
  }

export default connect(mapStateToProps)(PersonalData);