import auth from '@react-native-firebase/auth';
import { registrationErrors } from '../constants/registrationSteps';


/**
 * This fuction allow authentication of user 
 * @param {*} email 
 * @param {*} psw 
 */
export const login = async (email,psw,errFunc = (e)=>{}) => {

  const errorFunction = errFunc;

    let user = {};

    //CHECK INPUTS:
    await auth().signInWithEmailAndPassword(email,psw).then((usr)=>{
      console.log('User signed in! ID:' +usr.user.uid);
      user = usr.user;
    })
    .catch(error => {
      //console.log(JSON.stringify(error));
      user = null;
      //errFunc([registrationErrors.wrongPassword]);
      console.log("ERRORE: " + error.code);
      if (error.code === 'auth/user-mismatch') {
        console.log('The password is wrong');
      }
      
      if (error.code === 'auth/wrong-password') {
        errFunc([registrationErrors.weakPassword]);
        console.log('The password is wrong');
      }

      if (error.code === 'auth/invalid-email') {
        errFunc([registrationErrors.notValidEmail]);
        console.log('That email address is invalid!');
      }
  
      //else default error:--- //Generic error
      console.error(error);
    });

    return user;
}

export const register = async (email,psw,errFunc = (e)=>{}) =>{
  let user = {};

  await auth().createUserWithEmailAndPassword(email,psw).then((usr)=>{
      console.log('User account created & signed in! ID:' +usr.user.uid);
      user = usr.user;
    })
  .catch(error => {
    
    console.log("ERRORE: " + error.code);
    user=null;
    if (error.code === 'auth/email-already-in-use') {
      errFunc([registrationErrors.alreadyUserEmail]);
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      errFunc([registrationErrors.notValidEmail]);
      console.log('That email address is invalid!');
    }

    if (error.code === 'auth/weak-password') {
      errFunc([registrationErrors.weakPassword]);
      console.log('Password too weak,at least 6 character');
    }
    
  });

  console.log("REG USR: " + user);
  return user;
}