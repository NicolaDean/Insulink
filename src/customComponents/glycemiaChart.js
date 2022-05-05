
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { glicemyChartFormatter } from '../utils/chartDataFormatter';
import { FirebaseQuery } from '../utils/firebaseQuery';

const marginOffset=10;

const screenWidth = Dimensions.get("window").width-marginOffset*3;


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

    let userData=user.userData;
    console.log(JSON.stringify(userData.glicemy));
    console.log(JSON.stringify(FirebaseQuery.getTodayGlicemy(userData.glicemy)));

    const data = glicemyChartFormatter(FirebaseQuery.getTodayGlicemy(userData.glicemy));
    console.log(JSON.stringify(userData.glicemy));

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
        marginTop:8,
        marginBottom:8,
        borderRadius: 15,
        marginLeft:15,
        top: '5%',
        borderRadius: 15,
        borderRadius: 15,
        
    }
});

  
export default GlycemiaChart;