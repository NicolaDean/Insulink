import React, { useState,useEffect }  from 'react'
import { View,StyleSheet,Text,TextInput  } from 'react-native';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//REDUX
import { connect, useDispatch } from 'react-redux';
import {  loadUserLocalData, login } from '../../stateManager/reduxStates/actions/userAction';

//FIREBASE
import auth from '@react-native-firebase/auth';
import { loginStatus } from '../../constants/states';
import { colors } from '../../constants/appAspect';
import { MarginContainer } from '../../customComponents/containers/marginContainer';
import { InputBlock } from '../../customComponents/containers/inputsBlock';
import { InputContainer } from '../../customComponents/containers/inputsContainer';
import  GoogleButton  from './socialLogin/googleLogin';
import { RegistrationErrorPopup } from './registration/errorsPopup';

export const Login = ({navigation,status}) =>{

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [logged,setLogged] = useState(false);
	
    const [email,setEmail] = React.useState("");
    const [psw,setPsw] = React.useState("");

    console.log("Email:" + email);
    //Error Popup
    const [errors,setErrors] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

	//TODO ADD A LOADING BARR (Unlogged -> loading -> Logged) so dosnt seem slow app
	useEffect(()=>{
        if(errors.length > 0){
            if(loading== true){
                console.log("Some Errors");//Avoid loop in waiting
                setLoading(false);
            }        
        }
        console.log("STATUS: " + status);
		if(status == loginStatus.unlogged){
			console.log("BAR CHECK LOGIN");
			dispatch(loadUserLocalData([logged,setLogged]));
		}
		else{
			console.log("Logged");
			navigation.navigate('BottomTab',{});
		}
		
	},[status,errors])

    const errorFunction = (error) =>{
        console.log(JSON.stringify(error));
        setErrors(error);
        if(JSON.stringify(error) != "[]") {
            setErrorModalVisible(true);
        }
        
    }

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
    
        dispatch(login("marcofasa99@gmail.com","12345678"));
    }

    const tryLogin = async() =>{

        console.log("LOGIN IS IN ACTION");
        try{
            setLoading(true);
       
            console.log(email + "->" + psw);
            //TODO CHECK EMAIL AND PSW
            dispatch(login(email,psw,errorFunction));
        }catch{
            
        }
        
       
    }
    
    return (
        
        <View style={styles.container}>
            <RegistrationErrorPopup visibilityFlag={ [errorModalVisible, setErrorModalVisible]} errors={errors}/>
            <MarginContainer style={styles.container}>
                                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Insert Your Credential:"}>
                        <InputContainer name={"Email: "}>
                            <TextInput style={styles.textInput} keyboardType="email-address" testID={"EmailID"}  onChangeText={setEmail}/>
                        </InputContainer>
                        <InputContainer name={"Password: "}>
                            <TextInput style={styles.textInput} secureTextEntry={true} testID={"PswID"} onChangeText={setPsw}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Fast Test Login' onPress={testLogin}/>
                <CustomButton title='Login' testID={"LoginButtonID"} onPress={tryLogin}/>
          
                <CustomButton title='Register' testID={"RegistrationButtonID"} onPress={()=>{navigation.navigate('Registration',{})}}/>
                <GoogleButton navigation={navigation}/>

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