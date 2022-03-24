
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { glicemyChartFormatter } from '../utils/chartDataFormatter';
import { glicemyDateFormatter } from '../utils/firebaseQuery';

const marginOffset=10;

const screenWidth = Dimensions.get("window").width-marginOffset*3;


const todayDate=new Date();
//  const todaydate=new Date().toDateString();


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




const data3 = {
  
  labels: ["0 am", "3 am", "9 am", "3 pm", "6pm", "9 pm"],
  datasets: [
    {
      data: [
        300,
        200,
        120,
        80
        
      ]
    }
  ]

}
export const GlycemiaChart = ({
     navigation,
     diary,
     user }) =>{

        const getTodayGlycemia = () =>{

          let id = glicemyDateFormatter();
          console.log("AAAA:" + id);
          g = user.userData.glicemy[id];
          console.log("GG:" + JSON.stringify(user.userData.glicemy[id]));
          return g;
        }
        
        const data = glicemyChartFormatter(getTodayGlycemia());
        //const data = glicemyChartFormatter(getTodayGlycemia());

        //console.log("CHART:"  + JSON.stringify(data));
        
    return (
      
        <LineChart
        data={data3}
        width={screenWidth} // from react-native
        height={Dimensions.get("window").height*0.3}
        yAxisSuffix=" mg/dL"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        style={styles.chartStyle}
        bezier
      />
    );
}

const styles=StyleSheet.create({
    chartStyle:{
        paddingRight:screenWidth*0.25,
        marginVertical: 8,
        borderRadius: 15,
        marginLeft:15,
        top: '5%',
        borderRadius: 15,
        marginVertical: 8,
        borderRadius: 15,
        
    }
});

  
export default GlycemiaChart;