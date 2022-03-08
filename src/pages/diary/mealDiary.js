import React from 'react';
import { Text, View,Dimensions} from 'react-native';
import styles from './style'
import { connect } from 'react-redux';

import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";

import Meal from './meal';
const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset*3;



// USE SELECTOR WAY
//const diary = useSelector(state => state.macroTracker);
const chartConfig = {
    //General
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

   
      //TODO fit better the chart 
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
    
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };
    
    const chartStyle ={
        paddingRight:screenWidth*0.65,
        marginRight:marginOffset,
        marginLeft:"5%",
      top: "5%",
      borderRadius: 16,
      

    
  };
  
 //SAMPLE DATA FOR CHARTS
 const data2 = {
    labels: ["Carbo", "Fat", "Proteins"], // optional
    data: [0.4, 0.6, 0.8]
  };

const data = [
    {x:"Carb",y:100 },
    { x: "Fat",y:20},
    {x: "Prot",y:60 }
]

 

export const MealDiary = ({ navigation,diary }) =>{


  const maxCarb = 200;
  const maxProt = 100;
  const maxFat  = 100;

  const graph = {
    labels: ["Carbo", "Fat", "Proteins"], // optional
    data: [diary.totMacro.carb/maxCarb, diary.totMacro.fat/maxFat, diary.totMacro.prot/maxProt]
  }
  
return (
 //TODO ADD THE TOTAL MEALS MACRO GRAPH
<View  style={styles.sectionContainer}>

        <Text style={styles.title}>Meal Diary:</Text>
        <View style={{marginBottom:"5%"}}>
        <ProgressChart 
  data={graph}
  width={screenWidth}
  height={180}
  strokeWidth={10}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
  style={chartStyle}
/>

        </View>
        <Meal navigation = {navigation} name ="Colazione"   icon ="breakfast"   id="breakfast"/>
        <Meal navigation = {navigation} name ="Pranzo"      icon ="lunch"       id="lunch"/>
        <Meal navigation = {navigation} name ="Cena"        icon ="dinner"      id="dinner"/>
        <Meal navigation = {navigation} name ="Snack"       icon ="snack"       id="snack"/>
                <CustomButton title='Add Custom Meal' onPress={()=>{}}/>
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>


//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker};
}

export default connect(mapStateToProps)(MealDiary);
