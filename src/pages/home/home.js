import React, { useEffect, useState } from 'react';
import { View, Dimensions ,ScrollView,ActivityIndicator } from 'react-native';
import Slick from 'react-native-slick';
import styles from './style'

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton'
import CustomImageButton from '../../customComponents/customImageButton'
import PopUp from '../../customComponents/PopUp';

//REDUX
import { connect, useDispatch } from 'react-redux';
import { checkStateConsistency } from '../../stateManager/reduxStates/actions/rootAction';
import GlycemiaChart from '../../customComponents/glycemiaChart';
import { MacroChart } from '../../customComponents/macroChart';
import { Food_API } from '../../utils/apiQuery';
import { localStorage } from '../../utils/localStoreManager';
import { loadUserLocalData } from '../../stateManager/reduxStates/actions/userAction';
import Login from '../login/login';
import { loginStatus } from '../../constants/states';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
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

  const [loading,setLoading] = useState(true);

  console.log(user);
  const logged = (user.status && user.status == loginStatus.logged);
  
  //REDIRECT USER TO LOGIN IF NOT LOGGED
  useEffect(()=>{
    if(!logged){
      navigation.navigate('Login',{});
    } else{
      setLoading(false);
    }
    //console.log("U : " + u);
    //dispatch(checkStateConsistency(state.userReducer.status,navigation,[init,setInit]));
  },[logged]);

  const renderHome = () =>{
    return (
      <WaitLoading loadingState={[loading,setLoading]}>

      <ScrollView>
      <Slick style={styles.wrapper} showsButtons={false} autoplay={false}>

          <View style={styles.slide}>
            {!logged ?  null: <GlycemiaChart user={user}/> }
          </View>

          <View style={styles.slide}>
            <MacroChart diary={diary} user={user}/>
          </View>
        </Slick>
        <View style={{justifyContent: 'space-between',
              alignItems: 'stretch',flexDirection:'column'}}>
        <View style={{justifyContent: 'space-evenly',
              alignItems: 'flex-start',flexDirection:'row',marginBottom:10,marginHorizontal:40}}>
          <CustomImageButton
          image='statistics'
                onPress={() => navigation.navigate('MealDiary',{}) }
                useDefaultStyle={false}
                iconStyle={styles.icon}
                
            />
             <CustomImageButton
          image='defaultDiet'
                onPress={() => navigation.navigate('MealDiary',{}) }
                useDefaultStyle={false}
                iconStyle={styles.icon}
            />
        </View>
        <View style={{justifyContent: 'space-evenly',
              alignItems: 'flex-start',flexDirection:'row',marginHorizontal:40}}>
          <CustomImageButton
          image='calendar'
                onPress={() => navigation.navigate('Registration',{}) }
                useDefaultStyle={false}
                iconStyle={styles.icon}
            />
             <PopUp
          customImage='glucose'
                customStyle={styles.icon}
                name_to_open='Dose' name_to_close='close'
                useDefaultStyle={false}
            />
        </View>
        </View>
            
    </ScrollView>   
    </WaitLoading>
    );
  }
  //console.log("BBB: " +  (user.status == loginStatus.logged));
 
    return(
      
      <View>
          {logged?(renderHome()):<ActivityIndicator size="large"/>}
      </View>
    );
}



const mapStateToProps = (state, ownProps = {}) => {
  return{diary: state.macroTracker,user: state.userReducer,state:state};
}

export default connect(mapStateToProps)(Home);
