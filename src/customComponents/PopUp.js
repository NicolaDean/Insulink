import React, { useState } from "react";
import { Alert,TextInput, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import CustomButton from "./customButton";
import CustomImageButton from "./customImageButton";
import { connect, useDispatch } from 'react-redux';
import { Dimensions  } from 'react-native';

//REDUX IMPORT
import { editUserData } from '../../stateManager/reduxStates/actions/userAction';
import { userDataTypes } from '../../constants/states';
import { colors } from "../constants/appAspect";
import { addGlicemy } from "../stateManager/reduxStates/actions/userAction";
import { getTodayLastGlicemy } from "../utils/firebaseQuery";


export const PopUp = (
      {
        name_to_open="open",
        name_to_close="close",
        status
            }
    ) => {

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [glicemy, setGlicemy] = useState(0);
  const [actionTriggered, setActionTriggered] = useState('DOSE_CHECK'); 


  

  const addNewGlicemy = () =>
  {
    console.log("ADD NEW GLICEMY : " + glicemy);
    const id = status.userId;

    dispatch(addGlicemy(id,parseInt(glicemy)));
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {actionTriggered === 'DOSE_CHECK' ?
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <CustomImageButton
              title={name_to_close}
              image="close"
              iconStyle={styles.buttonClose}
              onPress={() => {setActionTriggered(''),setModalVisible(false)}}
            />
            <View style={{justifyContent:'space-around',flexDirection:'row'}}>
            <View style={{borderRightColor:colors.black,borderRightWidth:StyleSheet.hairlineWidth,marginLeft:10}}>
              <View style={{margin:10,marginVertical:'50%'}}>
<Text>Use my last glycemia</Text>
<CustomButton
        title="Skip"
        onPress={() => {setActionTriggered('DOSE_RESULT')}}/>
</View>

            </View>
            <View style={{margin:10,marginTop:'15%'}}>
            <Text style={styles.modalText}>Place you glycemia here:</Text>
            <TextInput style={styles.field}  keyboardType="numeric"   placeholder="mg/dL" onChangeText={setGlicemy}/>
            <CustomButton
              title="Insert"
              onPress={() => {addNewGlicemy(),setActionTriggered('DOSE_RESULT')}}/>
        </View>
        </View>
          </View>
        </View>
      :
      actionTriggered === 'DOSE_RESULT' ?
      <View style={styles.centeredView}>

          <View style={styles.modalView}>
          <CustomImageButton
              title={name_to_close}
              image="close"
              iconStyle={styles.buttonClose}
              onPress={() => {setActionTriggered(''),setModalVisible(false)}}
            />
      <Text>{JSON.stringify(getTodayLastGlicemy(status.userData.glicemy)) }</Text>
      <Text>AAAAAAA</Text>
      </View>
      </View> : null}
    </Modal><CustomButton
        title={name_to_open}
        onPress={() => {setModalVisible(true),setActionTriggered('DOSE_CHECK')}}/>
        </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    
    backgroundColor: "white",
    borderRadius: 14,
    paddingBottom:20,
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
    left: 170,
    position: 'relative',

    bottom:10
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

//export default PopUp;

export default connect(mapStateToProps)(PopUp);