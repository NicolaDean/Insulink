import React, { useEffect, useState } from 'react';
import { View, Dimensions ,ScrollView,ActivityIndicator,Platform ,useWindowDimensions} from 'react-native';
import Slick from 'react-native-slick';
import styles from './style'

//CUSTOM COMPONENTS
import CustomImageButton from '../../customComponents/customImageButton'
import PopUp from '../../customComponents/PopUp';

//REDUX
import { connect, useDispatch } from 'react-redux';
import GlycemiaChart from '../../customComponents/glycemiaChart';
import { MacroChart } from '../../customComponents/macroChart';
import { loginStatus } from '../../constants/states';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
import { ErrorPopup } from '../../customComponents/errorPopup';
import { registrationErrors } from '../../constants/registrationSteps';
import { showError } from '../../stateManager/reduxStates/actions/errorAction';
import CustomButton from '../../customComponents/customButton';
import {ActivityChart} from '../../customComponents/activityChart';
import {SportChart} from '../../customComponents/sportChart';

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

export const Home = ({ navigation,state,user,diary,error,userData }) =>{

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
    //error.errorFunc();

    
    //console.log("U : " + u);
    //dispatch(checkStateConsistency(state.userReducer.status,navigation,[init,setInit]));
  },[logged]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const renderHome = () =>{
    return (
      <WaitLoading loadingState={[loading,setLoading]}>

      <ScrollView>
        <View style={{flex:1,flexDirection:windowWidth < windowHeight ? 'column' :Platform.isPad? 'row':null,marginTop:windowWidth < windowHeight ?0:'13%'}}>
        <Slick style={styles.wrapper} showsButtons={false} autoplay={false}>

          <View style={styles.slide}>
            {!logged ?  null: <GlycemiaChart user={user}/> }
          </View>

          <View style={styles.slide}>
            <MacroChart diary={diary} user={user}/>
          </View>
          <View style={styles.slide}>
        <SportChart diary={diary} userData={userData.activitys}/>
        </View>
        <View style={styles.slide}>
        <ActivityChart diary={diary} userData={userData.activitys}/>
        </View>
        
        </Slick>
        <View style={{justifyContent: 'space-between',
              alignItems: 'stretch',flexDirection:'column'}}>
        <View style={{justifyContent: 'space-evenly',
              alignItems: 'flex-start',flexDirection:'row',marginBottom:windowWidth < windowHeight ?5:0,marginHorizontal:windowWidth < windowHeight ?40:0,marginHorizontal:windowWidth > windowHeight ?20:null}}>
          <CustomImageButton testID={"ScannerButton"}
          image='barcode'
                onPress={() => navigation.navigate('ScannerPage',{}) }
                useDefaultStyle={false}
                iconStyle={styles.icon}
                
            />
             <CustomImageButton  testID={"DiaryButton"}
          image='defaultDiet'
                onPress={() => navigation.navigate('MealDiary',{
                   openCalendar: false 
                }) }
                useDefaultStyle={false}
                iconStyle={styles.icon}
            />
        </View>
        <View style={{justifyContent: 'space-evenly',
              alignItems: 'flex-start',flexDirection:'row',marginBottom:5,marginHorizontal:windowWidth < windowHeight ?40:0,marginHorizontal:windowWidth > windowHeight ?20:0}}>
          <CustomImageButton  testID={"CalendarButton"}
          image='calendar'
          onPress={() => navigation.navigate('MealDiary',{
            openCalendar:true
         }) }                useDefaultStyle={false}
                iconStyle={styles.icon}
            />
             <PopUp 
          customImage='glucose'
                customStyle={styles.icon}
                name_to_open='Dose' name_to_close='close'
                useDefaultStyle={false}
                defaultLogic={false}
            />
        </View>
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
  return{error:state.errorReducer,diary: state.macroTracker,user: state.userReducer,state:state,userData: state.userReducer.userData};
}

export default connect(mapStateToProps)(Home);
