
import React,{useState} from 'react'
import { Button,View  } from 'react-native';

import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../../stateManager/reduxStates/actions/userAction';
import { RegistrationErrorPopup } from '../registration/errorsPopup';

GoogleSignin.configure({
  webClientId: '503937751847-f3p5g4fv6pa6l41v65avpobugi0f2bjd.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    const x = await auth().signInWithCredential(googleCredential);
    //console.log(JSON.stringify(x));
    return x.user;
  }

export const GoogleButton = () =>{

    const dispatch = useDispatch();

    const [errors,setErrors] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const errorFunc = (error) => {
        setErrors(error);

        if(JSON.stringify(error) != "[]") {
            setErrorModalVisible(true);
        }

        console.log(JSON.stringify(error))
    };
    const checkUserExistance = async() =>{
        //TODO check if exist the user in firebase side (otherwise redirect to Registration skipping page 1)
    
        const userData = await onGoogleButtonPress();
        console.log("Google Login UID: " + userData.uid);
        
        dispatch(googleLogin(userData.uid,errorFunc));
    }

    return (
        <View>
            <RegistrationErrorPopup visibilityFlag={ [errorModalVisible, setErrorModalVisible]} errors={errors}/>
           
           <GoogleSigninButton
               style={{ width: 192, height: 48 }}
               size={GoogleSigninButton.Size.Wide}
               color={GoogleSigninButton.Color.Dark}
               onPress={checkUserExistance}
           />
        </View>
       
      );
}