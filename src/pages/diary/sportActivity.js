import React, { useState } from "react";
import {ScrollView, Text, View,Dimensions,FlatList} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";
import { MacroChart } from '../../customComponents/macroChart';
import { GlycemiaChart } from '../../customComponents/glycemiaChart';
import CustomImageButton from '../../customComponents/customImageButton'
import { Food_API } from "../../utils/apiQuery";
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

//CUSTOM COMPONENTS
import Meal from './meal';
import styles from './style'

//REDUX
import { connect } from 'react-redux';


export const SportActivity = ({ navigation,diary,user }) =>{
  
    const [time, setTime] = useState('');
    const [value, setValue] = useState({
      hours: 1,
      minutes: 0,
    });
 
    const handleChange = (newValue) => {
      setValue(newValue);
      console.log(newValue)
    };


  return (
   //TODO ADD THE TOTAL MEALS MACRO GRAPHù
   <View style={styles.grid} >
   <FlatList
   data={[
       'tennis',
       'soccer',
       'fitness',
       'basket',
       'running',
       'swimming'
   ]}
   numColumns={3} 
   contentContainerStyle={{paddingBottom:'50%'}}
   renderItem={({item})=>{
    return(
    <CustomImageButton image={item} style={styles.sportImageContainer}  iconStyle={styles.sportImage} />

    )}}
  />
  <View style={{flexDirection:'row'}}>
      <CustomImageButton image="more" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} />
      <CustomImageButton image="less" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} />
</View>
<CustomButton title="Add Activity" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} />
<TimePicker value={value} onChange={handleChange} />
  <Text >{time}</Text>
  </View>
      );
  }


  
  
  //export default Home;
  const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker,user: state.userReducer};
  }
  
  export default connect(mapStateToProps)(SportActivity);