import React, { useState,useEffect }  from 'react'
import { View  } from 'react-native';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//REDUX
import { useDispatch } from 'react-redux';
import { addGlicemy, login, register } from '../../stateManager/reduxStates/actions/userAction';
import * as authSys from '../../utils/auth'

//FIREBASE
import auth from '@react-native-firebase/auth';

export const Login = ({navigation}) =>{

    const dispatch = useDispatch();

    const [init, setInit] = useState(true);

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

        navigation.navigate('Home',{});
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

export default Login;