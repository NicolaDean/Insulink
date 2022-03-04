import React from 'react';
import {TouchableOpacity, Text, View,Button, StyleSheet, Dimensions  } from 'react-native';
import styles from './style'
import {LineChart,ProgressChart} from "react-native-chart-kit";

import CustomButton from '../../customComponents/customButton'

  const marginOffset=10;
  const screenWidth = Dimensions.get("window").width-marginOffset;


//CHART CONFIG AND STYLE
const chartConfig = {
  //General
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
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
  
  const chartStyle ={
  
    marginRight:marginOffset,
    marginLeft:marginOffset,
    marginVertical: 8,
    borderRadius: 16
  
};

  //SAMPLE DATA FOR CHARTS
  const data2 = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const data3 = {
  
      labels: ["0 am", "3 am", "9 am", "3 pm", "6pm", "9 pm"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          
          ]
        }
      ]
    
  }
export const Home = ({ navigation }) =>{

    return(
        <View>
           <Text style={styles.sectionTitle}>Glycemia</Text>
  <LineChart
    data={data3}
    width={screenWidth} // from react-native
    height={100}
    yAxisLabel=""
    yAxisSuffix="mg/dL"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 4, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      segments: 5,
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    style={chartStyle}
  />
  
<ProgressChart
  data={data2}
  width={screenWidth}
  height={200}
  strokeWidth={19}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
  style={chartStyle}
/>
            <CustomButton
                title='Food Search'
                onPress={() => navigation.navigate('FoodSearch',{}) }
            />
            <CustomButton
                title='PersonalData'
                onPress={() => navigation.navigate('PersonalData',{}) }
            />

            <CustomButton
                title='Meal Diary'
                onPress={() => navigation.navigate('MealDiary',{}) }
            />
            
</View>
    );


}

export default Home;