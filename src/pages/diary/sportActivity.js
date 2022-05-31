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
import { connect, useDispatch } from 'react-redux';
import { colors } from "../../constants/appAspect";
import { ApiHelper } from "../../utils/apiHelper";
import { addActivityToDiary } from "../../stateManager/reduxStates/actions/macroTracker";
import { showError } from "../../stateManager/reduxStates/actions/errorAction";


export const SportActivity = ({ navigation,diary,userData }) =>{
  
    const dispatch = useDispatch();

    let timeString ="";
    var[sportString,setSportString]=useState('');
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
      }
      else
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
      }
      else
      {
        newValue.hours=value.hours-1;
        newValue.minutes=value.minutes-5+60;
        handleChange(newValue)
      }
  }
  const createQuery=()=>{
    let min=value.minutes;
      if(value.hours!=0){
        min=min+60*value.hours;
      }
      timeString='I made '+min+' minutes'+' of '+ sportString;
      
  }

  const errorFunc = (e) =>{
    dispatch(showError(e));
 }
  Food_API.errorFunc = errorFunc;
  
const addActivity = async() =>{
     if(sportString != "" || timeString!=''){
       
      try 
      {
        if (timeString==''){
          createQuery()
        }

        //GET API DATA
        const cal = (await Food_API.getSportCalories(timeString,userData))
        console.log(timeString)
        console.log(cal);

        const activity = ApiHelper.getSportJson(cal);
        dispatch(addActivityToDiary(activity));
        navigation.navigate('MealDiary',{})
      } 
      catch (error) 
      {
        console.error(error);
      } 
      finally {
        //setLoading(false); //TODO
      }
   }
   else{
     console.log('No sport picked')
   }
  }

  return (
   //TODO ADD THE TOTAL MEALS MACRO GRAPHù
   <View>
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
        borderRadius:10,
    }}>
  
    <CustomImageButton image={item} style={[{margin:30}]}  iconStyle={styles.sportImage} onPress ={()=>{setSportString(item)}} />
  
    </View>
    )}}
  />

</View>

  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:'2%'}}>
      <CustomImageButton image="more" style={{left:'0%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={moreTime} />
      <View style={{width:'70%',}}>
      <TimePicker value={value} onChange={handleChange}  hoursUnit='h' minutesUnit="m" minutesInterval={5}/>
      </View>
      <CustomImageButton image="less"  style={{right:'0%',marginTop:'3%'}} iconStyle={{width: 32,height: 32}} onPress={lessTime} />
</View>
<View style={{borderStartColor:colors.black,borderTopWidth:StyleSheet.hairlineWidth,marginTop:'10%',alignSelf:'center'}}>

<Text style={{fontSize:20,alignSelf:'center'}}>or</Text>
<Text style={{fontSize:14}}>Describe youe training and we will do the rest!</Text>
      <TextInput style={{fontSize:16}}   placeholder="What have you been up?" onChangeText={
            (value) => timeString=value
          }/>

</View>
          <CustomButton title="Add Activity" style={styles.sportImageContainer}  iconStyle={{width: 32,height: 32}} onPress={() =>addActivity()} />

     </View>
      );
  }


  
  
  //export default Home;
  const mapStateToProps = (state, ownProps = {}) => {
    return{diary: state.macroTracker,userData: state.userReducer.userData};
  }
  
  export default connect(mapStateToProps)(SportActivity);