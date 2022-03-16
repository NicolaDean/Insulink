import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions  } from 'react-native';
import {LineChart,ProgressChart} from "react-native-chart-kit";
import { connect, useDispatch } from 'react-redux';
import CustomButton from '../../customComponents/customButton'
import { checkStateConsistency } from '../../stateManager/reduxStates/actions/rootAction';
import { addGlicemy, login, register } from '../../stateManager/reduxStates/actions/userAction';

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
    paddingRight:screenWidth*0.25,
    marginRight:marginOffset,
    marginLeft:marginOffset,
    marginVertical: 8,
    borderRadius: 15,
    
};

const chartProgressStyle ={
  marginRight:marginOffset,
  marginLeft:marginOffset,
  marginVertical: 8,
  borderRadius: 15,
  

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
            300,
            200,
            120,
            80
            
          ]
        }
      ]
    
  }
export const Home = ({ navigation,diary }) =>{

  const dispatch = useDispatch();


  //REDIRECT USER TO LOGIN IF NOT LOGGED
  useEffect(()=>{
    dispatch(checkStateConsistency(diary.userReducer.status,navigation));
  },[]);

    return(
        <View>
            <LineChart
              data={data3}
              width={screenWidth} // from react-native
              height={Dimensions.get("window").height*0.3}
              yAxisSuffix=" mg/dL"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              style={chartStyle}
              bezier
            />
  
            <ProgressChart
              data={data2}
              width={screenWidth}
              height={200}
              strokeWidth={19}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={chartProgressStyle}
            />

            <CustomButton
                title='Meal Diary'
                onPress={() => navigation.navigate('MealDiary',{}) }
            />
            <CustomButton
                title='PersonalData'
                onPress={() => navigation.navigate('PersonalData',{}) }
            />    
                
            <CustomButton
                title='Add Glicemy Test'
                onPress={() => dispatch(addGlicemy("nicola@gmail.com",100)) }
            />      
                  
</View>
    );
}



//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state};
}

export default connect(mapStateToProps)(Home);

/*

            <CustomButton
                title='Food Search'
                onPress={() => navigation.navigate('FoodSearch',{}) }
            />
*/