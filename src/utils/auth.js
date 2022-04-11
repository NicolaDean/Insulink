import auth from '@react-native-firebase/auth';


/**
 * This fuction allow authentication of user 
 * @param {*} email 
 * @param {*} psw 
 */
export const login = async (email,psw) => {

    let user = {};

    //CHECK INPUTS:
    await auth().signInWithEmailAndPassword(email,psw).then((usr)=>{
      console.log('User signed in! ID:' +usr.user.uid);
      user = usr.user;
    })
    .catch(error => {
      user = null;
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });

    return user;
}

export const register = async (email,psw) =>{
  let user = {};

  await auth().createUserWithEmailAndPassword(email,psw).then((usr)=>{
      console.log('User account created & signed in! ID:' +usr.user.uid);
      user = usr.user;
    })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    if (error.code === 'auth/weak-password') {
      console.log('Password too weeak');
    }
    
  });

  return user;
}