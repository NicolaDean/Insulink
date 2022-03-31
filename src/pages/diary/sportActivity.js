import React, { useState } from "react";
import {ScrollView,StyleSheet,TextInput,TouchableOpacity,Pressable, Text, View,Dimensions,FlatList} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";
import { MacroChart } from '../../customComponents/macroChart';
import { GlycemiaChart } from '../../customComponents/glycemiaChart';
import CustomImageButton from '../../customComponents/customImageButton'
import {Food_API} from "../../utils/apiQuery";
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

//CUSTOM COMPONENTS
import Meal from './meal';
import styles from './style'

//REDUX
import { connect } from 'react-redux';
import { colors } from "../../constants/appAspect";


export const SportActivity = ({ navigation,diary,userData }) =>{
  
    const[timeString,setTimeString]=useState("");
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
   const addActivity=async()=>{
     if(timeString == "" || timeString==null){
     let s='I made '
     let min=value.minutes;
      if(value.hours!=0){
        min=min+60*value.hours;
      }
        s=s+min+' minutes'+' of '+ sportString;
        setTimeString(s)
    }

      try 
      {
        //GET API DATA
        const cal = (await Food_API.getSportCalories(timeString,userData))
      console.log(timeString)
      console.log(cal)

    } 
    catch (error) 
    {
      console.error(error);
    } 
    finally {
      //setLoading(false); //TODO
    }
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
   contentContainerStyle={{}}
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
      
  <View style={{flexDirection:'row'}}>
      <CustomImageButton image="more" style={{left:'0%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={moreTime} />
      <View style={{width:'70%',}}>
      <TimePicker value={value} onChange={handleChange}  hoursUnit='h' minutesUnit="m" minutesInterval={5}/>
      </View>
      <CustomImageButton image="less"  style={{right:'0%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={lessTime} />
</View>
<Text style={{fontSize:20}}>or</Text>
<Text style={{fontSize:14}}>Describe youe training and we will do the rest!</Text>
<View style={{borderStartColor:colors.black,borderTopWidth:StyleSheet.hairlineWidth,marginTop:'10%'}}>
      <TextInput style={{fontSize:16}}   placeholder="What have you been up?" onChangeText={
            (value) => setTimeString(value)
          }/>
          <CustomButton title="Add Activity" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} onPress={addActivity} />

     </View>
  </View>
      );
  }


  
  
  //export default Home;
  const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker,userData: state.userReducer.userData};
  }
  
  export default connect(mapStateToProps)(SportActivity);