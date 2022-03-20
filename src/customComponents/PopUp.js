import React, { useState } from "react";
import { Alert,TextInput, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import CustomButton from "./customButton";
import CustomImageButton from "./customImageButton";
import { connect, useDispatch } from 'react-redux';
import { Dimensions  } from 'react-native';


//REDUX IMPORT
import { editUserData } from '../../stateManager/reduxStates/actions/userAction';
import { userDataTypes } from '../../constants/states';

export const PopUp = (
    {name_to_open="open",name_to_close="close"}
    ) => {
  const [modalVisible, setModalVisible] = useState(false);
  const setInputField = (type,data) =>{
    setUserData(state =>({...state,[type]: data}));
}
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <CustomImageButton
              title={name_to_close}
              image="close"
              iconStyle={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text style={styles.modalText}>Place you glycemia here:</Text>
            <TextInput style={styles.field}  keyboardType="numeric"   placeholder="mg/dL" onChangeText={val => {console.log("glycemia: " + val)}}/>
            <CustomButton
        title="Insert"
        onPress={() => {console.log("Inserted")}}/>
              <Text style={styles.textStyle}>Hide Modal</Text>
          </View>
        </View>
      </Modal>
      <CustomButton
        title={name_to_open}
        onPress={() => setModalVisible(true)}/>
        <Text style={styles.textStyle}>Show Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  modalView: {
    
    backgroundColor: "white",
    borderRadius: 14,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 24,
    height: 24,
    right:0,
    left: 98,
    position: 'relative',

    bottom:35
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },field:{
    fontSize:30,
  } 

});

const mapStateToProps = (state, ownProps = {}) => {
    return{status: state.userReducer};
  }

export default PopUp;