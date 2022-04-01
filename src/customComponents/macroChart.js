
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {ProgressChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { colors } from '../constants/appAspect';

const marginOffset=10;

const screenWidth = Dimensions.get("window").width-marginOffset*3;

    const chartConfig = {
        //General
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: colors.orange,
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
    
/**
 * Avoid overflow on donut chart
 * @param {*} val val to plot
 * @param {*} max max donut support
 * @returns value to plot
 */
const maxValueCheck = (val,max) =>{
  return ((val/max)<1 ? (val/max):1);
}

export const MacroChart = ({diary,user }) =>{

    const maxCarb = user.maxCarb != undefined ? user.maxCarb : 200;
    const maxProt = user.maxCarb != undefined ? user.maxCarb : 100;
    const maxFat  = user.maxCarb != undefined ? user.maxCarb : 100;
    
    const graph = {
        labels: ["Carbo", "Fat", "Pro"], // optional
        data: [maxValueCheck(diary.totMacro.prot,maxProt),
               maxValueCheck(diary.totMacro.fat,maxFat),
               maxValueCheck(diary.totMacro.carb,maxCarb)]
      }
    return (
      
 <ProgressChart 
            data={graph}
            width={screenWidth}
            height={Dimensions.get("window").height*0.3}
            strokeWidth={15}
             radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
    );
}

const styles=StyleSheet.create({
    chartStyle: {
        marginLeft:15,
        top: '5%',
        borderRadius: 15,
        marginVertical: 8,
        borderRadius: 15,
        },
});

  
export default MacroChart;
