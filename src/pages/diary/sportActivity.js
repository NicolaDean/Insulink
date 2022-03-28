import React, { useState } from "react";
import {ScrollView, Text, View,Dimensions,FlatList} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";
import { MacroChart } from '../../customComponents/macroChart';
import { GlycemiaChart } from '../../customComponents/glycemiaChart';
import CustomImageButton from '../../customComponents/customImageButton'
import { Food_API } from "../../utils/apiQuery";
import TimePicker from "../../customComponents/timePicker";

//CUSTOM COMPONENTS
import Meal from './meal';
import styles from './style'

//REDUX
import { connect } from 'react-redux';


export const SportActivity = ({ navigation,diary,user }) =>{
  
    const [time, setTime] = useState('');

  
    const onCancel=()=> {
        TimePicker.close();
      }
     
     const  onConfirm=(hour, minute)=> {
        setTime(`${hour}:${minute}` );
        TimePicker.close();
      }

  return (
   //TODO ADD THE TOTAL MEALS MACRO GRAPHù
   <View style={styles.grid} >
   <FlatList
   data={[
       'tennis',
       'soccer',
       'fitness',
       'basket',
       'running'
   ]}
   numColumns={3} 
   contentContainerStyle={{}}
   renderItem={({item})=>{
    return(
    <CustomImageButton image={item} style={styles.sportImageContainer}  iconStyle={styles.sportImage} />

    )}}
  />
  <Text >{time}</Text>
  </View>
      );
  }


  
  
  //export default Home;
  const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker,user: state.userReducer};
  }
  
  export default connect(mapStateToProps)(SportActivity);