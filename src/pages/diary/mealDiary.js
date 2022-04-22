import React, { useState } from "react";
import {ScrollView, Text, View,Dimensions} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";
import { MacroChart } from '../../customComponents/macroChart';
import { GlycemiaChart } from '../../customComponents/glycemiaChart';
import { SportActivity } from "./sportActivity";
//CUSTOM COMPONENTS
import Meal from './meal';
import styles from './style'

//REDUX
import { connect, useDispatch } from 'react-redux';
import { Calendar } from "../../customComponents/calendarPicker";
import { CustomNumberPicker } from "../../customComponents/customNumberPicker";
import { InputContainer } from "../../customComponents/containers/inputsContainer";
import { MarginContainer } from "../../customComponents/containers/marginContainer";
import { loadHistory } from "../../stateManager/reduxStates/actions/macroTracker";
import { localStorage } from "../../utils/localStoreManager";




const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset*3;


// USE SELECTOR WAY
//const diary = useSelector(state => state.macroTracker);
const chartConfig = {
    //General
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    


      //TODO fit better the chart 
    propsForDots: {
      r: "6",
        strokeWidth: "7",
      stroke: "#ffa726"
    
    },
    propsForLabels:{

    },
    
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };



 

export const MealDiary = ({ navigation,diary,user }) =>{


  const dispatch = useDispatch();

  const maxCarb = 200;
  const maxProt = 100;
  const maxFat  = 100;
 
  console.log("DIARIO BABBANO: " + JSON.stringify(diary));
  
  const graph = {
    labels: ["Carbo", "Fat", "Pro"], // optional
    data: [(((diary.totMacro.prot.toFixed(2)/maxProt)<1) ? (diary.totMacro.prot.toFixed(2)/maxProt) : 1),(((diary.totMacro.fat.toFixed(2)/maxFat)<1) ? (diary.totMacro.fat.toFixed(2)/maxFat) : 1),(((diary.totMacro.carb.toFixed(2)/maxCarb)<1) ? (diary.totMacro.carb.toFixed(2)/maxCarb) : 1)]
  }
  
  const changeDay = (date) => {
    //TODO CHANGE currDate
    console.log("Data new "+ date);
    dispatch(loadHistory(date));
  }

  const storeMeals = () => {

    localStorage.storeFoodDiary("15-04-2022",{
      empty:true,
        totMacro:{cal:54,carb:55,fat:22,prot:0},
        meals:{
            breakfast:{foods:[{"id":{"food_name":"apple","serving_unit":"medium (3\" dia)","tag_name":"apple","serving_qty":1,"common_type":null,"tag_id":"384","photo":{"thumb":"https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg"},"locale":"en_US"},"name":"apple","image":"https://nix-tag-images.s3.amazonaws.com/384_highres.jpg","cal":94.64,"carb":25.13,"fat":0.31,"prot":0.47,"quantity":1,"unit":"medium (3\" dia)"}],macro:{cal:33,carb:44,fat:55,prot:0}},
            lunch:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
            dinner:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}},
            snack:{foods:[],macro:{cal:0,carb:0,fat:0,prot:0}}
        },
        activities:{
            breakfast:{sports:[],totCal:0},
            lunch:{sports:[],totCal:0},
            dinner:{sports:[],totCal:0},
            snack:{sports:[],totCal:0}
        }
    });
    
  }

return (
 //TODO ADD THE TOTAL MEALS MACRO GRAPH
 <View>
<ScrollView >
<View style={{justifyContent:'space-around',alignContent:'center',flexDirection:'column'}}>
      <Calendar onChange={changeDay}></Calendar>
</View>
<Slick style={styles.wrapper} showsButtons={false} autoplay={false}>
        <View style={styles.slide}>
        <MacroChart diary={diary} user={user}/>
        </View>
        <View style={styles.slide}>
        <MacroChart diary={diary} user={user}/>
        </View>
        <View style={styles.slide}>
        <GlycemiaChart diary={diary} user={user}/>
        </View>
      </Slick>
      <View style={{justifyContent:'space-around',alignContent:'center',flexDirection:'column'}}>
      <Text style={styles.title}>Meal Diary</Text>
</View>
        <Meal navigation = {navigation} name ="Colazione"   icon ="breakfast"   id="breakfast"/>
        <Meal navigation = {navigation} name ="Pranzo"      icon ="lunch"       id="lunch"/>
        <Meal navigation = {navigation} name ="Cena"        icon ="dinner"      id="dinner"/>
        <Meal navigation = {navigation} name ="Snack"       icon ="snack"       id="snack"/>
                <CustomButton title='Add Custom Meal' onPress={()=>{}}/>
                <CustomButton title='History Test (15 april)' onPress={()=>{storeMeals()}}/>
</ScrollView>
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>


//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker,user: state.userReducer};
}

export default connect(mapStateToProps)(MealDiary);
