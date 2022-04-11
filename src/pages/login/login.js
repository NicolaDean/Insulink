import React, { useState,useEffect }  from 'react'
import { View,StyleSheet,Text,TextInput  } from 'react-native';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//REDUX
import { connect, useDispatch } from 'react-redux';
import { addGlicemy, loadUserLocalData, login, register } from '../../stateManager/reduxStates/actions/userAction';
import * as authSys from '../../utils/auth'

//FIREBASE
import auth from '@react-native-firebase/auth';
import { loginStatus } from '../../constants/states';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
import { colors } from '../../constants/appAspect';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { InputBlock } from '../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../customComponents/containers/inputsContainer';

export const Login = ({navigation,status}) =>{

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [logged,setLogged] = useState(false);
	
    const [email,setEmail] = useState("");
    const [psw,setPsw] = useState("");

	//TODO ADD A LOADING BARR (Unlogged -> loading -> Logged) so dosnt seem slow app
	useEffect(()=>{
        console.log("STATUS: " + status);
		if(status == loginStatus.unlogged){
			console.log("BAR CHECK LOGIN");
			dispatch(loadUserLocalData([logged,setLogged]));
		}
		else{
			console.log("Logged");
			navigation.navigate('BottomTab',{});
		}
		
	},[status])

    // Handle user state changes
    function onAuthStateChanged(user) {
        //setUser(user);
        //console.log("USER: " + JSON.stringify(user));
        if (loading) setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) return null;

    const testLogin = async() =>
    {
        setLoading(true);
        console.log("TRY LOGIN");
    
        dispatch(login("marcofasa99@gmail.com","123456"));
    }

    const tryLogin = async() =>{
        setLoading(true);
       
        console.log(email + "->" + psw);
        //TODO CHECK EMAIL AND PSW
        dispatch(login(email,psw));
       
    }
    
    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                
                <Text style={styles.step}>Welcome to Insulink!!!</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Insert Your Credential:"}>
                        <InputContainer name={"Email: "}>
                            <TextInput style={styles.textInput} keyboardType="email-address" onChangeText={setEmail}/>
                        </InputContainer>
                        <InputContainer name={"Password: "}>
                            <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPsw}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Fast Test Login' onPress={testLogin}/>
                <CustomButton title='Login' onPress={tryLogin}/>
          
                <CustomButton title='Register' onPress={()=>{navigation.navigate('Registration',{})}}/>
            </MarginContainer>
        </View>
        
        
    );
}
const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:colors.light_orange,
    },
    textInput:{
        height: 40,
        width:'90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf:'center',
        backgroundColor:'white',

    },

})


const mapStateToProps = (state, ownProps = {}) => {
    return{status:state.userReducer.status};
}
  
export default connect(mapStateToProps)(Login);