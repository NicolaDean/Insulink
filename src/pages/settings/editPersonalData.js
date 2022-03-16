import React, { useEffect,useContext } from 'react';
import {TouchableOpacity,Image, Text, View,Button, TextInput,StyleSheet, Dimensions  } from 'react-native';
import { useState } from 'react';
import styles from './style'
import CustomButton from '../../customComponents/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localStorage from '../../utils/localStoreManager'
import { UserDataContext } from '../../stateManager/userDataProvider';
import {StyleTextInput} from '../../customComponents/StyleTextInput'
import { editUserData, login } from '../../stateManager/reduxStates/actions/userAction';
import { connect, useDispatch } from 'react-redux';
import { userDataTypes } from '../../constants/states';






export const EditPersonalData = ({ navigation,status }) =>{
    
    
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(status.userData);

    const setInputField = (type,data) =>{
        setUserData(state =>({...state,[type]: data}));
    }

    const saveData = async () => {
      //TODO CHANGE STATE

      console.log(userData);
      dispatch(editUserData(userData));
      
      //navigate back to Personal Data
      navigation.navigate('PersonalData',{})
    }


return (
    <View style={styles.sectionContainer}>
        <View style={styles.fieldContainer}>
<TextInput  style={styles.field} value={userData.name}      placeholder="Name" onChangeText={val => setInputField(userDataTypes.name,val)}/> 
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.weight}    placeholder="Weight [kg]" onChangeText={val => setInputField(userDataTypes.weight,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.height}    placeholder="Height [cm]" onChangeText={val => setInputField(userDataTypes.height,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.age}       placeholder="Age" onChangeText={val => setInputField(userDataTypes.age,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.isf}       placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={val => setInputField(userDataTypes.isf,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.choratio}  placeholder="Grams of CHO per 1 unit (Optional)" onChangeText={val => setInputField(userDataTypes.choratio,val)}/>
</View>
    

<CustomButton  title="Save Change"
              onPress={() => saveData()
            }
            />

</View> 

    );
    
}

const mapStateToProps = (state, ownProps = {}) => {
    return{status: state.userReducer};
  }

export default connect(mapStateToProps)(EditPersonalData);