import React, { useState,useEffect }  from 'react'
import { View  } from 'react-native';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//REDUX
import { connect, useDispatch } from 'react-redux';
import { addGlicemy, loadUserLocalData, login, register } from '../../stateManager/reduxStates/actions/userAction';
import * as authSys from '../../utils/auth'

//FIREBASE
import auth from '@react-native-firebase/auth';
import { loginStatus } from '../../constants/states';

export const Login = ({navigation,status}) =>{

    const dispatch = useDispatch();

    const [init, setInit] = useState(true);

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
        if (init) setInit(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (init) return null;

    const tryLogin = async() =>
    {
        console.log("TRY LOGIN");
    
        dispatch(login("marcofasa99@gmail.com","123456"));
        //dispatch(addGlicemy("zLZqvcoV2egpiguiJKxN5i9vrPK2",34));

        navigation.navigate('BottomTab',{});
    }
    
    return (
        <View>
            <CustomButton
                title='Login Test'
                onPress={tryLogin}
            /> 
        </View>
    );
}


const mapStateToProps = (state, ownProps = {}) => {
    return{status:state.userReducer.status};
  }
  
export default connect(mapStateToProps)(Login);