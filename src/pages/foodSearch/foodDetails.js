import React from 'react';
import {ActivityIndicator,Image, Text, View, ScrollView, TextInput, Dimensions, StatusBar  } from 'react-native';
import { useState,useEffect} from 'react';
import { VictoryPie } from 'victory-native';

//CUSTOM ASPECT AND COMPONENTS
import { foodDetails } from '../../utils/testingJsons';//Default food
import CustomButton from '../../customComponents/customButton';
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style'
import DropDownPicker from 'react-native-dropdown-picker';

//API
import * as api from "../../utils/apiQuery";
import { macroConstants } from '../../constants/states';

//REDUX
import { useDispatch } from 'react-redux';
import { addFood } from '../../stateManager/reduxStates/actions/macroTracker';




const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset;

export const FoodDetails = ({navigation,route}) =>{

    //TODO ADD A "LOADING BAR" UNTIL DATA ARENT LOADED
    let id = route.params.id.id;

    const dispatch = useDispatch();
    const [details, setDetails] = useState(false);
    const [unit,setUnit] = useState('g');
    const [amount,setAmount] = useState('100');
    const [items,setItems] = useState([{label:'',value:''}]);
    const [open, setOpen] = useState(false);
    
    //let image = "https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg";
    let name ="";
    let macro= {};
    let data = [
        {x:macroConstants.carb,y:10},
        {x: macroConstants.prot,y:200},
        {x: macroConstants.fat,y:30}];
    let units = [];
    
    //Retrive API food details data
    const getData = async (id)=>
    {
        let res;
        res = (await api.getIngredientDetailsAlternative(id.food_name));
        if(typeof(res.foods) === undefined) return;
        
        res = res.foods[0];
        res.alt_measures.forEach(measure=>{
            units.push({label:measure.measure,value:measure.measure});

        });        
        res.image = res.photo.highres;
        res.units = units;
        res.name = id.food_name;
        
        res.chartData = [
            {x:"Carb"  ,y:res.nf_total_carbohydrate },
            {x:"Fat"   ,y:res.nf_total_fat},
            {x:"Prot"  ,y:res.nf_protein }];
        
        console.log("Graph Data: " + JSON.stringify(res.chartData));
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
            name:   name,
            image:  details.image,
            cal:    details.nf_calories ,
            carb:   details.nf_total_carbohydrate,
            fat:    details.nf_total_fat,
            prot:   details.nf_protein
        }

        dispatch(addFood(food));

        navigation.navigate('MealDiary',{});
    }

    const renderDetails = () =>{
        return (
            <View style={{flex: 1,flexDirection: 'column'}}>
            <View style={{flex: 2,backgroundColor: 'white'}}>
                <Image style={styles.foodImage} source={{uri:details.image}}/>
                <Text style ={styles.sectionTitle}> {details.name}</Text>
            </View>
            <View style={{flex: 4,backgroundColor: 'skyblue',flexDirection:'column'}}>
                <ScrollView style={{flex:1}}>
                <View style={{flex:1.3,width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'white'}}>
                    <View style={{marginLeft:10,marginRight:10,marginTop:10,flexDirection:'row'}}>
                        <TextInput style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'20%'}}placeholder='amount' keyboardType="numeric"/>
                        <DropDownPicker
                            style={{width:'70%',marginLeft:'10%'}}
                            open={open}
                            value={unit}
                            items={details.units}
                            setOpen={setOpen}
                            setValue={setUnit}
                            setItems={setItems}
                            listMode="SCROLLVIEW"
                            />
                        
                    </View>
                    <View style={{width:'90%',flexDirection:'row',marginLeft:'5%',marginTop:10}}>
                        <Text style={{fontSize:28,color:'black'}}> {details.nf_calories} Kcal</Text>
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
                        <Text>Carbohydrates : {macro[macroConstants.carb]} g</Text>
                        <Text>Fat : {macro[macroConstants.fat]}g</Text>
                        <Text>Protein : {macro[macroConstants.prot]}g</Text>
                    </View>
                </View>
                <View style={{flex:1,width:'90%',marginLeft:'5%',marginTop:10}}>
                    <CustomButton style={styles.addButton} title="Add Food To Meal" onPress={()=>{addItem()}}/>
                </View>
                </ScrollView>
            </View>
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

export default FoodDetails;

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