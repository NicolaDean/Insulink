import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import { setError } from "../stateManager/reduxStates/actions/errorAction";
import { MarginContainer } from "./containers/marginContainer";

export const ErrorPopup = ({visibilityFlag = useState(false)}) => {

    const [errors,setErrors] = useState([]);
    const [modalVisible, setModalVisible] = visibilityFlag;

    const dispatch = useDispatch();

    const showError = (e)=>{
      if(e!=[]){
        console.log("TRY SHOW ERRORRR");
        console.log("SONO UN ERRORE");
        setModalVisible(true);
        setErrors(e);
      }else{
        console.log("Resetted error popup");
      }
        
    }
    const resetError = () =>{
      console.log("Try RESETTING");
      setErrors([]);
    }
    useEffect(()=>{
        console.log("INITIALIZE ERROR POPUP!!!");
        dispatch(setError(showError,resetError));
    },[]);

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