
import {Animated,Image, Dimensions,FlatList,Text, SafeAreaView,View,TouchableOpacity,LayoutAnimation, UIManager} from 'react-native';
import styles from './style'
import renderIf from './renderIf'
import * as api from "../../utils/apiQuery";
import {Food} from '../foodSearch/food'

import React,{ useState,useEffect, useContext } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

import { MealDataContext } from '../../stateManager/mealsDataProvider';
import CustomButton from '../../customComponents/customButton';
import { useDispatch } from 'react-redux';
import { selectMealType } from '../../stateManager/reduxStates/actions/macroTracker';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';



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

//IDEA:
/*
EACH MEAL HAS AN ID
WHEN I CLICK ON THE + button i pass the id as props so that i can add food to the global context of that meal
*/
export const Meal = ({navigation,name = "", icon = "breakfast", id,diary})  => {
    
    const [expanded,setExpanded] = useState( false )

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
  


    
    return (
        
        <SafeAreaView  style={{
            width: "90%",
            marginLeft:"5%",
            backgroundColor:"white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            borderRadius:15,
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            flexDirection:'row'
            ,marginBottom: 20,

          }}>
<SafeAreaView activeOpacity={0.2}
                      
                      style={{flexDirection:'column'}} > 
    <TouchableOpacity  style={{flexDirection:'row'}} onPress={() => { 
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
                        setExpanded(!expanded ); 
                    }}>
                     
                  <Image source={mealIcons[icon].uri} style={styles.mealImage} />

                <Text style={styles.mealName}>{name}</Text>
                <View style={{justifyContent:'flex-end',flexShrink:1,flexDirection:'row'}}>
                
            
                </View>
                 </TouchableOpacity>
                         
                           <View style={{ height: expanded ? null : 0,overflow: 'scroll',width:"90%",fontSize:20}}> 

                           <FlatList 
                            data={food}//id,name,image,cal,carbs,fat,prot
                            //food_name,serving_unit,tag_name,tag_id
                             numColumns={3}
                             renderItem={({ item }) => (<View>
                                                        <TouchableOpacity onPress={()=>{navigation.navigate('FoodDetails',{id : item.id})}} style={{flexDirection:'column',alignContent:'stretch'}}>
                            <Image source={ {uri: item.image}} style={styles.foodImage}/>
                            
                             </TouchableOpacity> 
<Text style={{fontSize:20,marginLeft:10}} >{item.name} {item.id.tag_id}: cal {item.prot}Kcal, carbo {item.carbs}g, fat  {item.fat}g, proteins {item.prot}g
                            {'\n'} 
                            </Text >

                            
                            </View>
                             )}
                            />
                           </View>
                           
</SafeAreaView>
                              
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


        </SafeAreaView>

       
    );
   

}

//export default Home;
const mapStateToProps = (state, ownProps = {}) => {
    
    return{diary: state.macroTracker};
  }
  
  export default connect(mapStateToProps)(Meal);