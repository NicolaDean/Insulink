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
import { connect } from 'react-redux';
import { Calendar } from "../../customComponents/calendarPicker";




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


  const maxCarb = 200;
  const maxProt = 100;
  const maxFat  = 100;
 
  const graph = {
    labels: ["Carbo", "Fat", "Pro"], // optional
    data: [(((diary.totMacro.prot.toFixed(2)/maxProt)<1) ? (diary.totMacro.prot.toFixed(2)/maxProt) : 1),(((diary.totMacro.fat.toFixed(2)/maxFat)<1) ? (diary.totMacro.fat.toFixed(2)/maxFat) : 1),(((diary.totMacro.carb.toFixed(2)/maxCarb)<1) ? (diary.totMacro.carb.toFixed(2)/maxCarb) : 1)]
  }
  

return (
 //TODO ADD THE TOTAL MEALS MACRO GRAPHù
 <View>

<ScrollView >

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
      <Calendar></Calendar>
</View>

        <Meal navigation = {navigation} name ="Colazione"   icon ="breakfast"   id="breakfast"/>
        <Meal navigation = {navigation} name ="Pranzo"      icon ="lunch"       id="lunch"/>
        <Meal navigation = {navigation} name ="Cena"        icon ="dinner"      id="dinner"/>
        <Meal navigation = {navigation} name ="Snack"       icon ="snack"       id="snack"/>
                <CustomButton title='Add Custom Meal' onPress={()=>{}}/>
                <CustomButton title='Add Sport Activity' onPress={() => navigation.navigate('SportActivity',{})}/>

</ScrollView>
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>


//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker,user: state.userReducer};
}

export default connect(mapStateToProps)(MealDiary);
