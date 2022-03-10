
import {ScrollView,Image,FlatList,Text, SafeAreaView,View,TouchableOpacity,LayoutAnimation} from 'react-native';
import styles from './style'
import {Food} from '../foodSearch/food'

import React,{ useState,useEffect, useContext } from 'react';

import { useDispatch } from 'react-redux';
import { selectMealType } from '../../stateManager/reduxStates/actions/macroTracker';
import { connect } from 'react-redux';


const mealIcons ={
    breakfast: {uri:require("../../assets/breakfast.png")},
    lunch:{uri:require("../../assets/lunch.png")},
    dinner:{uri:require("../../assets/dinner.png")},
    snack:{uri:require("../../assets/snack.png")},
    cal:{uri:require("../../assets/calories.png")},
    fat:{uri:require("../../assets/fat.png")},
    protein:{uri:require("../../assets/protein.png")},
    carbo:{uri:require("../../assets/carbohydrates.png")},
}

export const Meal = ({navigation,name = "", icon = "breakfast", id,diary})  => {
    
    //This variable keep track of the expansios status of meal (can be shrinked or growed by click)
    const [expanded,setExpanded] = useState( false )
    const [apiSelected, setApi] = useState(false);

    const dispatch = useDispatch();

    const dropViewHeight=100
    
    //const [currentMealType,setMealType] = useContext(MealDataContext);
    //setMealType("PASTOO CASUALE");

    let macro = diary.meals[id].macro;
    let food= diary.meals[id].foods;

    console.log("macro:" + JSON.stringify(macro) + typeof(macro) +typeof(macro.id));

    const addFoods = () =>{
        
        dispatch(selectMealType(id));

        navigation.navigate('FoodSearch',{});
    }
  
    const expandMeal = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpanded(expanded => !expanded); 
    }

    const renderListItem = (item) =>{
        return(
            <View style={{alignContent:'center'}}>
                <Food style={styles.food} data = {item.id} nav = {navigation} api={apiSelected} activeView={false}></Food>
                <Text style={{fontSize:15,marginLeft:10,marginBottom:10}} >{item.id.serving_unit} </Text >
            </View>
        );
    }

    const showExpansion = () =>{
        return (
            <ScrollView horizontal={true} style={{ width:"100%", overflow: 'scroll',fontSize:20}}> 
                <FlatList 
                    data={food}//id,name,image,cal,carbs,fat,prot,food_name,serving_unit,tag_name,tag_id
                    numColumns={3}
                    style={{overflow: 'scroll',}}
                    renderItem={({ item }) => (renderListItem(item))}
                />
            </ScrollView>
        );
    }

    
    return (
        
<SafeAreaView  style={styles.mealView}>
    <View style={{width:'100%',flexDirection:'row'}}>
        <View activeOpacity={0.2} style={{flex:1,flexDirection:'column'}} > 
            <TouchableOpacity  style={{flexDirection:'row'}} onPress = {expandMeal}>
                <Image source={mealIcons[icon].uri} style={styles.mealImage} />
                <Text style={styles.mealName}>{name}</Text>
                <View style={{justifyContent:'flex-end',flexShrink:1,flexDirection:'row'}}>
                </View>
            </TouchableOpacity>                  
        </View>
                                
        <View style={styles.addBox} >
                    <View style={styles.macroContainer}>
                        <Image source={mealIcons['cal'].uri} style={styles.macroImage} />
                        <Text>{diary.meals[id].macro['cal'].toFixed(2)}</Text>
                    </View>
                    <View style={styles.macroContainer}>
                    <Image source={mealIcons['carbo'].uri} style={styles.macroImage} />
                    <Text>{diary.meals[id].macro['carb'].toFixed(2)}</Text>
                    </View>
                    <View style={styles.macroContainer}>
                    <Image source={mealIcons['fat'].uri} style={styles.macroImage} />
                    <Text>{diary.meals[id].macro['fat'].toFixed(2)}</Text>
                    </View>
                    <View style={styles.macroContainer}>
                    <Image source={mealIcons['protein'].uri} style={styles.macroImage} />
                    <Text>{diary.meals[id].macro['prot'].toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity  onPress={()=>{addFoods()}}>
                        <Image source={require('../../assets/plus.png')} style={styles.addIcon}/>
                    </TouchableOpacity>
        </View>
    </View>
  
        {
            //SHOW THE LIST OF FOODS ONLY IF EXPANDED IS TRUE
            expanded ? (showExpansion()):null
        }
        
</SafeAreaView>

       
    );//
   

}
/*                */
//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
    
    return{diary: state.macroTracker};
  }
  
  export default connect(mapStateToProps)(Meal);