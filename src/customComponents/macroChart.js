
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {ProgressChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';

const marginOffset=10;

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
    
export const MacroChart = ({
     navigation,
     diary,
     user }) =>{
    const maxCarb = 200;
    const maxProt = 100;
    const maxFat  = 100;
    const graph = {
        labels: ["Carbo", "Fat", "Pro"], // optional
        data: [(((diary.totMacro.prot.toFixed(2)/maxProt)<1) ? (diary.totMacro.prot.toFixed(2)/maxProt) : 1),(((diary.totMacro.fat.toFixed(2)/maxFat)<1) ? (diary.totMacro.fat.toFixed(2)/maxFat) : 1),(((diary.totMacro.carb.toFixed(2)/maxCarb)<1) ? (diary.totMacro.carb.toFixed(2)/maxCarb) : 1)]
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
