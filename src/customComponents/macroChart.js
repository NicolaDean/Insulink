
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image,useWindowDimensions } from 'react-native';
import {ProgressChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { colors } from '../constants/appAspect';

const marginOffset=10;

const fakeData = {
  labels: ["Carbo", "Pro", "Fat"], // optional
  data: [0.4, 0.6, 0.8]
};

const screenWidth = Dimensions.get("window").width-marginOffset*3;

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
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
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
      <View style={{alignSelf:'center'}}>
 <ProgressChart 
            data={graph}
            width={windowWidth < windowHeight ?windowWidth:windowWidth/2}
            height={Dimensions.get("window").height*0.3}
            strokeWidth={15}
             radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chartStyle}
          />
          </View>
    );
}

const styles=StyleSheet.create({
    chartStyle: {
      alignSelf:'center',
        top: '5%',
        borderRadius: 15,
        marginVertical: 8,
        borderRadius: 15,
        },
});

  
export default MacroChart;
