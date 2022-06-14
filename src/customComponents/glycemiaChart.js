
import React from 'react';
import {  StyleSheet,Platform,Dimensions,TouchableOpacity, View, Image,useWindowDimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { glicemyChartFormatter } from '../utils/chartDataFormatter';
import { FirebaseQuery } from '../utils/firebaseQuery';

const marginOffset=10;

const screenWidth = Dimensions.get("window").width-marginOffset*3;
const fakeData={
  labels: ["8:00", "12:00", "14:00", "16:00", "20:00", "22:00"],
  datasets: [
    {
      data: [
        100,
        200,
        150,
        80,
        100,
        120
      ]
    }
  ]
}

const chartConfig = {
    //General
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    
      //TODO fit better the chart 
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
      barPercentage: 0.5,
      marginRight:marginOffset,
      marginLeft:marginOffset,
      useShadowColorFromDataset: false, // optional
};

export const GlycemiaChart = ({
     navigation,
     diary,
     user }) =>{
      const windowWidth = useWindowDimensions().width;
      const windowHeight = useWindowDimensions().height;
    let userData=user.userData;
    //console.log(JSON.stringify(userData.glicemy));
    //console.log(JSON.stringify(FirebaseQuery.getTodayGlicemy(userData.glicemy)));

    const data = glicemyChartFormatter(FirebaseQuery.getTodayGlicemy(userData.glicemy));
    if(Platform.isPad!=true){
    return (
        <LineChart
        data={data}
        width={windowWidth*0.95}
        height={windowHeight*0.3}
        yAxisSuffix=" mg/dL"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        style={styles.chartStyleAndroid}
        bezier
      />
    );}
    else{
      return (
        <View style={{alignSelf:'center'}}>
        <LineChart
        data={data}
        width={windowWidth < windowHeight ?screenWidth:windowWidth/2}
        height={windowWidth < windowHeight ?windowHeight*0.27:windowHeight*0.30}
        yAxisSuffix=" mg/dL"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        style={windowWidth < windowHeight?styles.chartStyle :styles.chartStyleLandscape}
        bezier
      /></View>
    );
    }
}

const styles=StyleSheet.create({
    chartStyle:{
      paddingLeft:75,
      paddingRight:80,
        marginTop:8,
        marginBottom:8,
        borderRadius: 15,
        top: '5%',
        
    },chartStyleLandscape:{
      paddingLeft:70,
      paddingRight:80,
        marginTop:8,
        marginBottom:8,
        borderRadius: 15,
        top: '5%',
    },chartStyleAndroid:{
      paddingRight:screenWidth*0.22,
 paddingLeft:screenWidth*0.03,
   marginTop:8,
   marginBottom:8,
   borderRadius: 15,
   top: '5%',
   
},

});

  
export default GlycemiaChart;