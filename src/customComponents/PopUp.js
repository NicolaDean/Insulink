import React, { useState } from "react";
import { Alert,TextInput, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import CustomButton from "./customButton";
import CustomImageButton from "./customImageButton";
import { connect, useDispatch } from 'react-redux';
import InsulineCalculator from "../utils/insulineCalculator";

//REDUX IMPORT
import { colors } from "../constants/appAspect";
import { addGlicemy } from "../stateManager/reduxStates/actions/userAction";
import { getTodayLastGlicemy } from "../utils/firebaseQuery";


export const PopUp = (
      {
        name_to_open="open",
        name_to_close="close",
        status,
        diary,
        id
            }
    ) => {

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [glicemy, setGlicemy] = useState(0);
  const [actionTriggered, setActionTriggered] = useState('DOSE_CHECK'); 
  const ic = new InsulineCalculator(10,120);//Insted of arguments -->UserData.CHORatio
  const [modalWidth,setModalWidth] =useState(0);

  const find_dimesions=(layout) =>{
    const {x, y, width, height} = layout;
    /*
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
    */
    setModalWidth(width);
  }

  console.log("banana");

  

  const addNewGlicemy = () =>
  {
    console.log("ADD NEW GLICEMY : " + glicemy);
    const id = status.userId;

    dispatch(addGlicemy(id,parseInt(glicemy)));
  }

  const DoseCheck = () =>{
    return(
    <View style={styles.centeredView}  >
      <View style={styles.modalView} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}>
              <CustomImageButton
              title={name_to_close}
              image="close"
              iconStyle={[styles.buttonClose,{left:modalWidth/2-15}]}
              onPress={() => {setActionTriggered(''),setModalVisible(false)}}
            />
        <View style={{justifyContent:'space-around',flexDirection:'row'}}>
          <View style={{borderRightColor:colors.black,borderRightWidth:StyleSheet.hairlineWidth,marginLeft:10}}>
            <View style={{margin:10,marginVertical:'50%'}}>
              <Text style={styles.modalText}>Use my last</Text>
              <Text style={styles.modalText}>Glycemia</Text>
              <CustomButton title="Skip" onPress={() => {setActionTriggered('DOSE_RESULT')}}/>
            </View>
          </View>
          <View style={{margin:10,marginTop:'15%'}}>
              <Text style={styles.modalText}>Place your</Text>
              <Text style={styles.modalText}>Glycemia here:</Text>

              <TextInput style={styles.field}  keyboardType="numeric"   placeholder="mg/dL" onChangeText={setGlicemy}/>
              <CustomButton
                  title="Insert"
                  onPress={() => {addNewGlicemy(),setActionTriggered('DOSE_RESULT')}}/>
          </View>
        </View>
      </View>
    </View>);
  }

  const DoseResult = () => {
    return(
    <View style={styles.centeredView}>

      <View style={styles.modalView} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}>
        <CustomImageButton
                title={name_to_close}
                image="close"
                iconStyle={[styles.buttonClose,{left:modalWidth/2-15}]}
                onPress={() => {setActionTriggered(''),setModalVisible(false)}}
              />
        <Text style={styles.modalText}>We suggest you to make</Text>
        <Text style={styles.doseText}>{ic.totalDose(getTodayLastGlicemy(status.userData.glicemy),diary.meals[id].macro['carb'].toFixed(2))}</Text>
        <Text style={styles.modalText}>doses of insuline</Text>
        <CustomImageButton
                title={name_to_close}
                image="ok"
                iconStyle={styles.buttonOK}
                onPress={() => {setActionTriggered(''),setModalVisible(false)}}
              />
      </View>
    </View>);
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
        {
        actionTriggered === 'DOSE_CHECK' ? DoseCheck() :
        actionTriggered === 'DOSE_RESULT'? DoseResult():null
       }
    </Modal><CustomImageButton
        title={name_to_open}
        onPress={() => {setModalVisible(true),setActionTriggered('DOSE_CHECK')}}
        image='dose'
        iconStyle={{height:40,width:40}}
        style={{}}
        />
       
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
    paddingHorizontal:20,
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
    width: 36,
    height: 36,
    position: 'relative',
    top:0,
    bottom:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:15,
    marginBottom: 10,
    textAlign: "center"
  },field:{
    fontSize:30,
    marginLeft:'10%'
  } ,
  doseText: {
    textAlign: "center",
    fontWeight: "bold",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    fontSize:30,
    backgroundColor: "#F194FF",
    borderRadius: 14,
    padding:10,
    marginVertical:10,
    paddingHorizontal:20,

  }, buttonOK: {
    width: 64,
    height: 64,
    position: 'relative',
    paddingHorizontal:20,
    padding:25
  },

});

const mapStateToProps = (state, ownProps = {}) => {
    return{status: state.userReducer,diary: state.macroTracker};
  }

//export default PopUp;

export default connect(mapStateToProps)(PopUp);