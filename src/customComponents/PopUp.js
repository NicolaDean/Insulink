import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import CustomButton from "./customButton";
import CustomImageButton from "./customImageButton";


export const PopUp = (
    {name_to_open="open",name_to_close="close"}
    ) => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text style={styles.modalText}>Hello World!</Text>
            
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
    marginTop: 10
  },
  modalView: {
    
    backgroundColor: "white",
    borderRadius: 14,
    padding: 35,
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
    width: 22,
    height: 22,
    right:0,
    left:70,
    bottom:40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PopUp;