import React from 'react';
import {ScrollView, Text, View,Dimensions} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../customComponents/customButton';
import {ProgressChart} from "react-native-chart-kit";


//CUSTOM COMPONENTS
import Meal from './meal';
import styles from './style'

//REDUX
import { connect } from 'react-redux';




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



 

export const MealDiary = ({ navigation,diary }) =>{


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
        <ProgressChart 
            data={graph}
            width={screenWidth}
            height={180}
            strokeWidth={15}
             radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
        </View>
        <View style={styles.slide}>
        <ProgressChart 
            data={graph}
            width={screenWidth}
            height={180}
            strokeWidth={15}
             radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
        </View>
        <View style={styles.slide}>
        <ProgressChart 
            data={graph}
            width={screenWidth}
            height={180}
            strokeWidth={15}
             radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
        </View>
      </Slick>

<Text style={styles.title}>Meal Diary:</Text>
        
        
        <Meal navigation = {navigation} name ="Colazione"   icon ="breakfast"   id="breakfast"/>
        <Meal navigation = {navigation} name ="Pranzo"      icon ="lunch"       id="lunch"/>
        <Meal navigation = {navigation} name ="Cena"        icon ="dinner"      id="dinner"/>
        <Meal navigation = {navigation} name ="Snack"       icon ="snack"       id="snack"/>
                <CustomButton title='Add Custom Meal' onPress={()=>{}}/>
</ScrollView>
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>


//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker};
}

export default connect(mapStateToProps)(MealDiary);
