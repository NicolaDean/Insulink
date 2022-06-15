
import React from 'react';
import {  StyleSheet,Dimensions,TouchableOpacity, View, Image,Platform,useWindowDimensions } from 'react-native';
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
     userData }) =>{
    //const data = glicemyChartFormatter(FirebaseQuery.getTodayGlicemy(user.userData.glicemy));
    //console.log(JSON.stringify(data));
    const data = [
        { date: "2022-07-02", count: 0 },
        { date: "2022-07-03", count: 0 },
        { date: "2022-07-04", count: 0 },
        { date: "2022-07-05", count: 0 },
      ];
      const windowWidth = useWindowDimensions().width;
      const windowHeight = useWindowDimensions().height;

      console.log("FOTTUTI DATI " + JSON.stringify(userData));
      const chartData = (userData == undefined) ? data : userData;
      
    return (
      Platform.isPad!=true?
<ContributionGraph
        values={chartData}
        endDate={new Date()}
        numDays={100}
        width={windowWidth*0.95}
        height={windowHeight*0.3}
        chartConfig={chartConfig}
        style={styles.chartStyle}
        gutterSize={5}
        squareSize={15}

      />
      :
        <ContributionGraph
        values={chartData}
        endDate={new Date()}
        numDays={windowWidth < windowHeight ?135:80}
        width={windowWidth < windowHeight ?screenWidth:windowWidth/2}
        height={windowWidth < windowHeight ?windowHeight*0.27:windowHeight*0.30}
        chartConfig={chartConfig}
        style={styles.chartStyle}
        gutterSize={15}
        squareSize={20}

      />
    );
}

const styles=StyleSheet.create({
    chartStyle:{
      alignSelf:'center',
        marginTop:8,
        marginBottom:8,
        top: '5%',
        borderRadius: 15,
    }
});

  
export default ActivityChart;