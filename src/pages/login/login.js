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

    const tryLogin = async() =>
    {
        setLoading(true);
        console.log("TRY LOGIN");
    
        dispatch(login("marcofasa99@gmail.com","123456"));
        //dispatch(addGlicemy("zLZqvcoV2egpiguiJKxN5i9vrPK2",34));

        //navigation.navigate('BottomTab',{});
    }
    
    return (
        
        <View style={styles.container}>
            <MarginContainer style={styles.container}>
                
                <Text style={styles.step}>Welcome to Insulink!!!</Text>
                <View>
                    <Text style={styles.title}></Text>
                    <InputBlock name={"Insert Your Credential:"}>
                        <InputContainer name={"Email: "}>
                            <TextInput style={styles.textInput} keyboardType="email-address"/>
                        </InputContainer>
                        <InputContainer name={"Password: "}>
                            <TextInput style={styles.textInput} secureTextEntry={true}/>
                        </InputContainer>
                    </InputBlock>
                </View>
                <CustomButton title='Login' onPress={tryLogin}/>
            </MarginContainer>
        </View>
        
        
    );
}
const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'orange'
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

})


const mapStateToProps = (state, ownProps = {}) => {
    return{status:state.userReducer.status};
}
  
export default connect(mapStateToProps)(Login);