import React, { useState } from "react";
import {ScrollView,TouchableOpacity,Pressable, Text, View,Dimensions,FlatList} from 'react-native';
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
import { colors } from "../../constants/appAspect";


export const SportActivity = ({ navigation,diary,user }) =>{
  
    const[timeString,setTimeString]=useState('');
    const[sportString,setSportString]=useState('')
    const [value, setValue] = useState({
      hours: 1,
      minutes: 0,
    });
 
   const typeSelected=(value)=> {
      Alert.alert(value);
      this.setState({
          itemPressed: value
      });
   }
    const handleChange = (newValue) => {
      setValue(newValue);
      console.log(newValue)
    };

    const moreTime=()=>{
      var newValue={
        hours: 0,
        minutes: 0,
      };
      

      if(value.minutes<=50){
        newValue.hours=value.hours;

      newValue.minutes=value.minutes+5;
    handleChange(newValue)
  }else
  {
    newValue.hours=value.hours+1;
    newValue.minutes=0;
    handleChange(newValue)
      }

    }

    const lessTime=()=>{
      var newValue={
        hours: 0,
        minutes: 0,
      };
      

      if(value.minutes>=5){

        newValue.hours=value.hours;
        newValue.minutes=value.minutes-5;
    handleChange(newValue)
  }else
  {
    newValue.hours=value.hours-1;
    newValue.minutes=value.minutes-5+60;
    handleChange(newValue)
      }

    }
   const addActivity=()=>{
     let s='I made '
      if(value.hours!=0){
        s=s+value.hours+' hours '
      }
      if(value.minutes!=0){
        s=s+value.minutes+' minutes'
      }
      s=s+' of '+ sportString;
      

      setTimeString(s)
      console.log(s)

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
       'running',
       'swimming'
   ]}
   numColumns={3} 
   contentContainerStyle={{paddingBottom:'50%'}}
   renderItem={({item})=>{
    return(
      <View
      style={{  
        backgroundColor: sportString  === item ? colors.primary : null,
        borderRadius:10
    }}>
  
    <CustomImageButton image={item} style={[{margin:30}]}  iconStyle={styles.sportImage} onPress ={()=>{setSportString(item)}} />
  
    </View>
    )}}
  />
      
  <View style={{flex:1,flexDirection:'row'}}>
      <CustomImageButton image="more" style={{left:'15%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={moreTime} />
      <View style={{width:'70%',}}>
      <TimePicker value={value} onChange={handleChange}  hoursUnit='h' minutesUnit="m" minutesInterval={5}/>
      </View>
      <CustomImageButton image="less"  style={{right:'15%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={lessTime} />

</View>
<CustomButton title="Add Activity" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} onPress={addActivity} />
  </View>
      );
  }


  
  
  //export default Home;
  const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker,user: state.userReducer};
  }
  
  export default connect(mapStateToProps)(SportActivity);