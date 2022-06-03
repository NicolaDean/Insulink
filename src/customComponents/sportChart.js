
import React from 'react';
import {  StyleSheet,Dimensions,Platform,TouchableOpacity, View, Image ,useWindowDimensions } from 'react-native';
import {BarChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import { glicemyChartFormatter } from '../utils/chartDataFormatter';
import { FirebaseQuery } from '../utils/firebaseQuery';

const marginOffset=10;

const screenWidth = Dimensions.get("window").width-marginOffset*3;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};
const chartConfig = {
    //General
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
      barPercentage: 0.4,
      useShadowColorFromDataset: false, // optional

};

export const SportChart = ({
     navigation,
     diary,
     userData }) =>{

      var dataReal=  {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      };

      const initialize = (dayIndex) =>{
        let daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let i=dayIndex;
        let len=userData.length-1

        for (var k=0;k<7;k++){
          dataReal.labels.unshift(daysArray[i%7])
          i--;
          if(i<0){
            i=i+7;
          }
        }
        
        for (var k=len;len-k<7;k--){
          //console.log('AAA' +userData[k].count)
          if(userData[k]!=undefined){
            dataReal.datasets[0].data.unshift(userData[k].count)
          }
          else{
            dataReal.datasets[0].data.unshift(0)

          }
        
        }

        console.log(JSON.stringify(dataReal))

    }

    const data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };

    if(userData!=undefined){
      initialize(new Date(userData[userData.length-1].date).getDay());
    }
    else{
      dataReal=data
    }
    


    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
      
        <BarChart
        style={styles.chartStyle}
        data={dataReal}
        width={windowWidth < windowHeight ?screenWidth:windowWidth/2}
        height={windowWidth < windowHeight ?windowHeight*0.27:windowHeight*0.30}
        yAxisLabel="cal "
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        pad
      />
    );
}

const styles=StyleSheet.create({
    chartStyle:{
      alignSelf:'center',

        marginTop:8,
        marginBottom:8,
        marginLeft:15,
        top:'5%',
        borderRadius: 15,
    }
});

  
export default SportChart;