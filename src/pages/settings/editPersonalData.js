//LIBRARY IMPORT
import React, { useState } from 'react';
import {View, TextInput } from 'react-native';
import { connect, useDispatch } from 'react-redux';

//GUI IMPORT
import styles from './style'
import CustomButton from '../../customComponents/customButton';

//REDUX IMPORT
import { editUserData } from '../../stateManager/reduxStates/actions/userAction';
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
<TextInput  style={styles.field} value={userData.name} placeholder="Name" onChangeText={val => setInputField(userDataTypes.name,val)}/> 
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.weight.toString()} keyboardType="numeric"    placeholder="Weight [kg]" onChangeText={val => setInputField(userDataTypes.weight,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.height.toString()} keyboardType="numeric"    placeholder="Height [cm]" onChangeText={val => setInputField(userDataTypes.height,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.age.toString()} keyboardType="numeric"      placeholder="Age" onChangeText={val => setInputField(userDataTypes.age,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.isf.toString()} keyboardType="numeric"      placeholder="Insuline Sensitivity Factor (Optional)" onChangeText={val => setInputField(userDataTypes.isf,val)}/>
</View>
    <View style={styles.fieldContainer}>
<TextInput style={styles.field} value={userData.choratio.toString()}  keyboardType="numeric" placeholder="Grams of CHO per 1 unit (Optional)" onChangeText={val => setInputField(userDataTypes.choratio,val)}/>
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