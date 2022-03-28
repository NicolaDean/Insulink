import React from 'react';
import {ActivityIndicator,Image, Text, View, ScrollView, TextInput, Dimensions  } from 'react-native';
import { useState,useEffect} from 'react';
import { VictoryPie } from 'victory-native';

//CUSTOM ASPECT AND COMPONENTS
import CustomButton from '../../customComponents/customButton';
import styles from './style'
import DropDownPicker from 'react-native-dropdown-picker';
import mealIcons from '../../assets/mealIcons';

//API
import {Food_API} from "../../utils/apiQuery";
import { ApiHelper } from '../../utils/apiHelper';

//REDUX
import { connect, useDispatch } from 'react-redux';
import { addFood } from '../../stateManager/reduxStates/actions/macroTracker';
import MacroTable from './macroTable';


const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset;

export const FoodDetails = ({navigation,route,identifier}) =>{

    //TODO ADD A "LOADING BAR" UNTIL DATA ARENT LOADED
    let id = route.params.id.id;

    const dispatch = useDispatch();
    const [details, setDetails] = useState(false);
    const [unit,setUnit] = useState('g');
    const [amount,setAmount] = useState(1);
    const [items,setItems] = useState([{label:'',value:''}]);
    const [open, setOpen] = useState(false);
    
    //Retrive API food details data
    const getData = async (id)=>
    {
        //RETRIVE DATA
        let res;
        res = (await Food_API.getIngredientDetailsAlternative(id.food_name));
        if(typeof(res.foods) === undefined) return;
        res = res.foods[0];

        //DO SOME PREPROCESSING TO THE DATA 
        res = ApiHelper.enrichDatails(res);
        
        setItems(res.units);
        //SET DETAILS VARIABLE
        setDetails(res);
    }

    //Call on first render
    useEffect(()=>{
        getData(id);
    },[]);

    const addItem = () =>{

        var food ={
            id:     id,
            name:   details.name,
            image:  details.image,
            cal:    details.current_calories ,
            carb:   details.current_total_carbohydrate,
            fat:    details.current_total_fat,
            prot:   details.current_protein,
            quantity: amount,
            identifier: identifier,
        }

        dispatch(addFood(food));

        navigation.navigate('MealDiary',{});
    }

    const updateAmount = (a) =>{
        let q = parseInt(a);

        if(isNaN(q)){
            console.log('Invalid Qty!!!');
            q = 1;
        }
        setAmount(q);
        makeProportions(unit,q);
    }

    const makeProportions = (item,qty=1) =>{

        const proportion = ApiHelper.makeProportion(details,item,qty);
        console.log("prop:" + proportion);
        setDetails(proportion);
    }

    const renderDetails = () =>{
        return (
            
        
        <View style={{flex: 1,flexDirection: 'column'}}>
            
            <ScrollView style={{flex:1}}>
            <View style={{flex: 2,backgroundColor: 'white'}}>
                <Image style={styles.foodImage} source={{uri:details.image}}/>
                <Text style ={styles.sectionTitle}> {details.name}</Text>
            </View>
            <View style={{flex: 4,backgroundColor: 'rgba(255, 203, 126, 0.49)',flexDirection:'column'}}>
                
                <View style={{flex:1.3,width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'rgba(255, 203, 126, 0.19)'}}>
                    <View style={{marginLeft:10,marginRight:10,marginTop:10,flexDirection:'row'}}>
                        <TextInput defaultValue="1" style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'20%'}} onChangeText={a=>{updateAmount(a)}} placeholder='amount' keyboardType="numeric"/>
                        <DropDownPicker
                            onSelectItem={(item) => {
                                makeProportions(item.value);
                            }}
                            style={{width:'70%',marginLeft:'10%',zIndex: 20,}}
                            open={open}
                            value={unit}
                            items={items}
                            setOpen={setOpen}
                            setValue={setUnit}
                            setItems={setItems}
                            listMode="SCROLLVIEW"
                            />
                        
                    </View>
                    <View style={{width:'90%',flexDirection:'row',marginLeft:'5%',marginTop:10}}>
                        <Text style={{fontSize:28,color:'black'}}> {details.current_calories} Kcal</Text>
                    </View>
                </View>
                <View style={{flex:2,flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'white'}}>
                {console.log("Update:" + JSON.stringify(details.chartData))}
                <VictoryPie 
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                        data={details.chartData}
                        width={200}
                        height={200}
                        innerRadius={30}
                        style={{
                            labels: {
                            fill: 'gray', fontSize: 20, padding: 7,
                        }, }}
                    /> 
                    <View style={styles.graphLegend}> 
                        <View style={styles.macroContainer}>
                            <Image source={mealIcons['carbo'].uri} style={styles.macroImage} />
                            <Text>CARB: {details.current_total_carbohydrate} g</Text>
                        </View>
                        <View style={styles.macroContainer}>
                            <Image source={mealIcons['fat'].uri} style={styles.macroImage} />
                            <Text>FAT: {details.current_total_fat} g</Text>
                        </View>
                        <View style={styles.macroContainer}>
                            <Image source={mealIcons['protein'].uri} style={styles.macroImage} />
                            <Text>PROT: {details.current_protein} g</Text>
                        </View>
                    </View>
                </View>
                <MacroTable data={details}/>
                <View style={{flex:1,width:'90%',marginLeft:'5%',marginTop:10}}>
                    <CustomButton style={styles.addButton} title="Add Food To Meal" onPress={()=>{addItem()}}/>
                </View>
                <View style={{flex:2,width:'90%',marginLeft:'5%',marginTop:10}}>
                    <CustomButton style={styles.addButton} title="Add Food To Meal" onPress={()=>{addItem()}}/>
                </View>
                
            </View>
            </ScrollView>
        </View>
        );
    }

    //TODO CREATE CHART WITH NUTRIENTS
    return (

        <View style={{flex:1}}>
            { (details === false) ? <ActivityIndicator size="large" /> : renderDetails()}
        </View>
    );
}

const mapStateToProps = (state, ownProps = {}) => {
    
    return{identifier: state.macroTracker.id};
  }
  
  export default connect(mapStateToProps)(FoodDetails);
/* 
<View style={styles.sectionContainer} >
                {(details.image === "") ? 
                    <ActivityIndicator size="small" color="#0000ff" /> :
                    <Image style={styles.foodImage} source={{uri:details.image}}/>
                 }

                <View >
                    <Text style ={styles.sectionTitle}> {name}</Text>
                    <View style={{flexDirection:'column',alignSelf:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text > Unit:</Text>
                            <SelectDropdown buttonStyle = {{height:40,width:200}} data={details.units} onSelect={(selectedItem, index) => {
		                                console.log(selectedItem, index);
	                                }}/>
                        </View>
                        <View style={{flexDirection:'row',margin: 5}}>
                            <Text > Amount:</Text>
                            
                            <TextInput placeholder='amount' keyboardType="numeric"/>
                       </View>
                       
                    </View>
                </View>
                
           </View>
           
           <View style={styles.bodySection}>
       
           <Text>Calories: {macro[macroConstants.cal]}</Text>
                <View style={styles.graphBox} >
                    <VictoryPie 
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                        data={data}
                        width={200}
                        height={200}
                        innerRadius={30}
                        style={{
                            labels: {
                            fill: 'gray', fontSize: 20, padding: 7,
                        }, }}
                    /> 
                    <View style={styles.graphLegend}> 
                        <Text>Carbohydrates : {macro[macroConstants.carb]} g</Text>
                        <Text>Fat : {macro[macroConstants.fat]}g</Text>
                        <Text>Protein : {macro[macroConstants.prot]}g</Text>
                    </View>
                </View>
           <CustomButton style={styles.addButton} title="Add Food To Meal" onPress={()=>{addItem()}}/>
           </View>
*/


//{"CHOCDF": 47.29999923706055, "ENERC_KCAL": 203, "FAT": 0, "FIBTG": 1.399999976158142, "PROCNT": 1.350000023841858}