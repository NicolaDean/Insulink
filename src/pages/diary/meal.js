
import React,{ useState,useEffect, useContext } from 'react';
import {ScrollView,Image,FlatList,Text, SafeAreaView,View,TouchableOpacity,LayoutAnimation,useWindowDimensions} from 'react-native';
import InsulineCalculator from '../../utils/insulineCalculator'

//CUSTOM COMPONENTS
import CustomButton from '../../customComponents/customButton';
import {Food} from '../foodSearch/food'
import styles from './style'
import PopUp from '../../customComponents/PopUp';


//REDUX
import { useDispatch } from 'react-redux';
import { selectMealType } from '../../stateManager/reduxStates/actions/macroTracker';
import { connect } from 'react-redux';
import mealIcons from '../../assets/mealIcons';
import { color } from 'react-native-reanimated';
import { colors } from '../../constants/appAspect';
import { FirebaseQuery } from '../../utils/firebaseQuery';
import { WaitLoading } from '../../customComponents/containers/waitLoading';
import { initialDiaryState } from '../../stateManager/reduxStates/reducers/macroTracker';



export const Meal = ({navigation,name = "", icon = "breakfast", id,diary})  => {
    
    //This variable keep track of the expansios status of meal (can be shrinked or growed by click)
    const [expanded,setExpanded] = useState( false )
    const [apiSelected, setApi] = useState(false);
    const available = diary.currentDate == FirebaseQuery.glicemyDateFormatter();

    const dispatch = useDispatch();

    const dropViewHeight=100
    const ic = new InsulineCalculator(10,120);//Insted of arguments -->UserData.CHORatio
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    //const [currentMealType,setMealType] = useContext(MealDataContext);
    //setMealType("PASTOO CASUALE");

    let macro;
    let food;
    let sport;

    const loadInfo = () =>{
        //console.log("CURR DATE:  " + diary.currentDate + " -> " + FirebaseQuery.glicemyDateFormatter());
        if(diary.currentDate == FirebaseQuery.glicemyDateFormatter()){
            //IF TODAY IS SELECTED
            try{
                macro = diary.meals[id].macro;
                food  = diary.meals[id].foods;
                sport = diary.activities[id].sports;
            }catch(e){
                
                console.log("DATA NOT READY");
                macro = initialDiaryState.history.meals[id].macro;
                food =  initialDiaryState.history.meals[id].foods;
                sport =  initialDiaryState.history.activities[id].sports;
                diary = initialDiaryState;
            }
           
 
        }else{
            console.log("NOT TODAY -> "  +diary.currentDate + " ->" + FirebaseQuery.glicemyDateFormatter())
            //OTHER DAY IS SELECTED
            
            try{
                macro = diary.history.meals[id].macro;
                food =  diary.history.meals[id].foods;
                sport =  diary.history.activities[id].sports;
            }catch(e){
                
                console.log("DATA NOT READY");
                macro = initialDiaryState.history.meals[id].macro;
                food =  initialDiaryState.history.meals[id].foods;
                sport =  initialDiaryState.history.activities[id].sports;

                diary = initialDiaryState;
            }
        }
    }
    
    loadInfo();
    //console.log("macro :" + JSON.stringify(macro) + typeof(macro) +typeof(macro.id));

    const addFoods = () =>{
        
        dispatch(selectMealType(id));

        navigation.navigate('FoodSearch',{});
    }
    const addSport=()=>{
        dispatch(selectMealType(id));

        navigation.navigate('SportActivity',{});
    }
  
    const expandMeal = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpanded(expanded => !expanded); 
    }
    const handlerLongClick = () => {
        //handler for Long Click
        alert('Button Long Pressed');
      };
    
    const x = 0;
    const renderListItem = (item,index) =>{
        return(
            <View key={index} style={{alignContent:'center',justifyContent:'center'}}>
                <TouchableOpacity  style={{alignContent:'center'}} >
                    <Food  style={styles.food} data = {item} nav = {navigation} api={apiSelected} deletable={true} ></Food>
                </TouchableOpacity>
            </View>
        );
    }
    const renderListItemSport = (item) =>{
        return(
            <View  style={{alignContent:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{alignContent:'center'}} >
                    <Food style={styles.food} data = {item} nav = {navigation} api={apiSelected} deletable={true} sport={true} ></Food>
                </TouchableOpacity>
            </View>
        );
    }

    const showExpansion = () =>{
        return (
        <View>
            <ScrollView> 
                <FlatList
                    keyExtractor={(item, index)=> index}
                    data={food}//id,name,image,cal,carbs,fat,prot,food_name,serving_unit,tag_name,tag_id
                    style={{}}
                    horizontal={true}
                    renderItem={({ item ,index}) => (renderListItem(item,index))}
                />
                <FlatList 
                    keyExtractor={(item, index)=> index}
                    data={sport}//id,name,image,cal,carbs,fat,prot,food_name,serving_unit,tag_name,tag_id
                    style={{}}
                    horizontal={true}
                    renderItem={({ item }) => (renderListItemSport(item))}
                />
            </ScrollView>
            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',backgroundColor:colors.primary,borderBottomEndRadius: 10,borderBottomLeftRadius:10}}>
             <CustomButton onPress={()=>{addSport()}} title='Add Sport' disabled={!available} style={styles.appButtonContainer} useDefaultStyle={false} testID={"AddSportID"}/>
            <PopUp name_to_open='Dose' name_to_close='close' defaultLogic={true} id={id} testID={"DosePopupID"}/>
            <CustomButton onPress={()=>{addFoods()}} title='Add Food' disabled={!available} style={styles.appButtonContainer} useDefaultStyle={false} testID={"AddFoodID"}/>
            </View>
                
        </View>
        );
    }


    return (
     
<SafeAreaView  style={styles.mealView}>
    <View style={{}}>
    <View style={{width:'100%',flexDirection:'row'}}>
        <View activeOpacity={0.2} style={{flex:1,flexDirection:'column'}} > 
            <TouchableOpacity testID='MealID' style={{flexDirection:'row'}} onPress = {expandMeal}>
                <Image source={mealIcons[icon].uri} style={styles.mealImage} />
                <Text style={styles.mealName}>{name}</Text>
                <View style={{justifyContent:'flex-end',flexShrink:1,flexDirection:'row'}}>
                </View>
            </TouchableOpacity>                  
        </View>
    <View style={styles.addBox} >
                        <View style={styles.macroContainer}>
                            <Image source={mealIcons['insuline'].uri} style={styles.macroImage} />
                            <Text>{JSON.stringify(ic.mealDose(macro['carb'].toFixed(2)))}</Text>
                        </View>
                        <View style={styles.macroContainer}>
                            <Image source={mealIcons['cal'].uri} style={styles.macroImage} />
                            <Text>{macro['cal'].toFixed(1)}</Text>
                        </View>
                        <View style={styles.macroContainer}>
                        <Image source={mealIcons['carbo'].uri} style={styles.macroImage} />
                        <Text>{macro['carb'].toFixed(1)}</Text>
                        </View>
                        <View style={styles.macroContainer}>
                        <Image source={mealIcons['fat'].uri} style={styles.macroImage} />
                        <Text>{macro['fat'].toFixed(1)}</Text>
                        </View>
                        <View style={styles.macroContainer}>
                        <Image source={mealIcons['protein'].uri} style={styles.macroImage} />
                        <Text>{macro['prot'].toFixed(1)}</Text>
                        </View>
        
            </View>

    </View>
  
        {
            //SHOW THE LIST OF FOODS ONLY IF EXPANDED IS TRUE
            expanded ? (showExpansion()):null
        }

</View>
</SafeAreaView>
       
    );//
   

}
/*                */
//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
    
    return{diary: state.macroTracker};
  }
  
  export default connect(mapStateToProps)(Meal);