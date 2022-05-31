
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image } from 'react-native';
import {ContributionGraph} from "react-native-chart-kit";
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
    marginRight:marginOffset,
    marginLeft:marginOffset,
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
};

export const ActivityChart = ({
     navigation,
     diary,
     user }) =>{

    
    //const data = glicemyChartFormatter(FirebaseQuery.getTodayGlicemy(user.userData.glicemy));
    //console.log(JSON.stringify(data));
    const commitsData = [
        { date: "2022-05-02", count: 1 },
        { date: "2022-05-03", count: 2 },
        { date: "2022-05-04", count: 3 },
        { date: "2022-05-05", count: 4 },
        { date: "2022-05-06", count: 5 },
        { date: "2022-05-09", count: 2 },
        { date: "2022-05-10", count: 3 },
        { date: "2022-05-13", count: 2 },
        { date: "2022-05-16", count: 4 },
        { date: "2022-05-17", count: 2 },
        { date: "2022-05-30", count: 4 }
      ];

    return (
        <ContributionGraph
        values={commitsData}
        endDate={new Date()}
        numDays={90}
        width={screenWidth}
        height={Dimensions.get("window").height*0.3}
        chartConfig={chartConfig}
        style={styles.chartStyle}
      />
    );
}

const styles=StyleSheet.create({
    chartStyle:{
        marginTop:8,
        marginBottom:8,
        marginLeft:15,
        top: '5%',
        borderRadius: 15,
    }
});

  
export default ActivityChart;