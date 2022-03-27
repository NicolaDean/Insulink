import React from 'react';
import {ActivityIndicator,Image, Text, View, ScrollView, TextInput, Dimensions  } from 'react-native';
import { useState,useEffect} from 'react';
import { VictoryPie } from 'victory-native';

//CUSTOM ASPECT AND COMPONENTS
import CustomButton from '../../customComponents/customButton';
import styles from './style'
import DropDownPicker from 'react-native-dropdown-picker';

//API
import * as api from "../../utils/apiQuery";

//REDUX
import { connect, useDispatch } from 'react-redux';
import { addFood } from '../../stateManager/reduxStates/actions/macroTracker';

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
        res = (await api.getIngredientDetailsAlternative(id.food_name));
        if(typeof(res.foods) === undefined) return;
        res = res.foods[0];

        //RETRIVE DIFFERENT SERVING UNITS AND BUILD DROPDOWN DATA STRUCTURE
        const tmp = [];
        const dictionary = {};
        res.alt_measures.forEach(measure=>{
            tmp.push({label:measure.measure,value:measure.measure});
            dictionary[measure.measure] = measure; 
        });   

        //FIX SOME VALUES IN MORE EASY WAY
        res.image = res.photo.highres;
        res.units = tmp;
        res.units_dic = dictionary;
        res.name = id.food_name;
        
        //CURRENT MACRO NUTRIENTS (needed for the custom amount)
        res.current_carb    = res.nf_total_carbohydrate;
        res.current_fat     = res.nf_total_fat;
        res.current_prot    = res.nf_protein;
        res.current_cal     = res.nf_calories;

        //BUILD CHART DATA STRUCT
        res.chartData = [
            {x:"Carb"  ,y:res.nf_total_carbohydrate },
            {x:"Fat"   ,y:res.nf_total_fat},
            {x:"Prot"  ,y:res.nf_protein }];
        
        //console.log("Graph Data: " + JSON.stringify(res.alt_measures));
        //console.log("Current Unit: " + JSON.stringify(id.serving_unit));
        //console.log("Unit: " + JSON.stringify(dictionary[id.serving_unit]));
        //console.log("grams: " + JSON.stringify(res.serving_weight_grams));

        setItems(res.units);
        //SET DETAILS VARIABLE
        setDetails(res);
    }

    //Call on first render
    useEffect(()=>{
        getData(id);
    },[]);


    
    //const properties = api.extractProperties(details.nutrition.properties);
    
    const addItem = () =>{

        var food ={
            id:     id,
            name:   details.name,
            image:  details.image,
            cal:    details.nf_calories ,
            carb:   details.nf_total_carbohydrate,
            fat:    details.nf_total_fat,
            prot:   details.nf_protein,
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

        
        const measure = details.units_dic[item];
        console.log(JSON.stringify(measure));

        const proportion = {...details};

        const ratio = (measure.serving_weight*qty)/details.serving_weight_grams;

        proportion.current_carb    = (ratio*proportion.nf_total_carbohydrate).toFixed(1);
        proportion.current_fat     = (ratio*proportion.nf_total_fat).toFixed(1);
        proportion.current_prot    = (ratio*proportion.nf_protein).toFixed(1);
        proportion.current_cal     = (ratio*proportion.nf_calories).toFixed(1);

        proportion.chartData = [
            {x:"Carb"  ,y:proportion.current_carb },
            {x:"Fat"   ,y:proportion.current_fat},
            {x:"Prot"  ,y:proportion.current_prot }];

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
                        <Text style={{fontSize:28,color:'black'}}> {details.current_cal} Kcal</Text>
                    </View>
                </View>
                <View style={{flex:2,flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'white'}}>
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
                        <Text>Carbohydrates : {details.current_carb} g</Text>
                        <Text>Fat : {details.current_fat}g</Text>
                        <Text>Protein : {details.current_prot}g</Text>
                    </View>
                </View>
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