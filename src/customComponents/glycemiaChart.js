
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';

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




    
export const GlycemiaChart = ({
     navigation,
     diary,
     user }) =>{

        function getTodayGlycemia(){
            var len = user.userData.glicemy.length ;
            var data = [];
            var i=0;
            todayDate.setHours(0,0,0,0);
            var lastGlicemy = user.userData.glicemy[0];
            console.log(lastGlicemy.time);
            while(i<len && lastGlicemy!=null){
             data.push(lastGlicemy.value);
             i=i+1;
             lastGlicemy = user.userData.glicemy[i];
            }
          return data;
        }

        const data = {
  
            labels: ["0 am", "3 am", "9 am", "3 pm", "6pm", "9 pm"],
            datasets: [
              {
                data: getTodayGlycemia()
              }
            ]
          
        }


        
    return (
      
        <LineChart
        data={data}
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