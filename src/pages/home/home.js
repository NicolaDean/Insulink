import React, { useEffect, useState } from 'react';
import { View, Dimensions ,ScrollView } from 'react-native';
import Slick from 'react-native-slick';
import styles from './style'

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton'

//REDUX
import { connect, useDispatch } from 'react-redux';
import { checkStateConsistency } from '../../stateManager/reduxStates/actions/rootAction';
import GlycemiaChart from '../../customComponents/glycemiaChart';
import { MacroChart } from '../../customComponents/macroChart';
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

export const Home = ({ navigation,state,user,diary }) =>{

  const dispatch = useDispatch();

  const [init,setInit] = useState(true);

  //REDIRECT USER TO LOGIN IF NOT LOGGED
  useEffect(()=>{
    dispatch(checkStateConsistency(state.userReducer.status,navigation,[init,setInit]));
  },[]);

  if(init) return null;
  
    return(
        <View>
          <ScrollView>
            <Slick style={styles.wrapper} showsButtons={false} autoplay={false}>

                <View style={styles.slide}>
                  {init ?  null: <GlycemiaChart user={user}/> }
                </View>

                <View style={styles.slide}>
                  <MacroChart diary={diary} user={user}/>
                </View>
              </Slick>
                  <CustomButton
                      title='Meal Diary'
                      onPress={() => navigation.navigate('MealDiary',{}) }
                  />
                  <CustomButton
                      title='PersonalData'
                      onPress={() => navigation.navigate('PersonalData',{}) }
                  />    
          </ScrollView>

                  
</View>
    );
}



const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker,user: state.userReducer,state:state};
}

export default connect(mapStateToProps)(Home);
