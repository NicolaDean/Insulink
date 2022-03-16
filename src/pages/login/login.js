
import React from 'react'
import { View  } from 'react-native';

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';

//REDUX
import { useDispatch } from 'react-redux';
import { login } from '../../stateManager/reduxStates/actions/userAction';

export const Login = ({navigation}) =>{

    const dispatch = useDispatch();

    const tryLogin = () =>
    {
        dispatch(login("nicola@gmail.com",""))
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