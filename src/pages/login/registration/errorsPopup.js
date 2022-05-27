import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { MarginContainer } from "../../../customComponents/containers/marginContainer";

export const RegistrationErrorPopup = ({visibilityFlag = useState(false),errors = []}) => {

    const [modalVisible, setModalVisible] = visibilityFlag;

    const errorBubble = (error,index) =>{
      console.log("POPUP: " + JSON.stringify(error));
        return(
            <MarginContainer key ={ index}>
                <Text  style = {styles.errorTitle} testID="ErrorID">{error.title}</Text>
                <Text style = {styles.errorBody}>{error.body}</Text>
            </MarginContainer>
        );
    }
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.errorHeader}>ERRORS:</Text>
              {errors.map((e,index)=>{return errorBubble(e,index)})}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Errors</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };


  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop:15,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    errorHeader: {
      fontSize:20,
      marginBottom: 15,
      textAlign: "center",
      color:'red',
    },
    errorTitle:{
        fontSize:17,
        fontWeight:'bold',
        color:'black',
        textAlign: "center"
    }
  });