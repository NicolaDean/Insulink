import React from 'react';
import {ActivityIndicator,Image, Text, View, ScrollView, TextInput, Dimensions,Alert  } from 'react-native';
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
import { addFood, editFood, removeFood } from '../../stateManager/reduxStates/actions/macroTracker';
import MacroTable from './macroTable';
import { CustomImageButton } from '../../customComponents/customImageButton';
import { buttonIconsNames,buttonIcons } from '../../assets/buttonIcons';
import { colors } from '../../constants/appAspect';
import { FirebaseQuery } from '../../utils/firebaseQuery';
import { showError } from '../../stateManager/reduxStates/actions/errorAction';


const marginOffset=10;
const screenWidth = Dimensions.get("window").width-marginOffset;

export const FoodDetails = ({route,navigation,currentDate}) =>{
    //console.count('counter');
    console.log("DDDD: " + currentDate);
    //TODO ADD A "LOADING BAR" UNTIL DATA ARENT LOADED
    let data = route.params.data; //TODO IN FOOD IS WRONGLY PASSED ID INSTEAD OF DATA (try correct)
    let foodInfo = route.params.foodInfo;

    console.log("FOOD:" + JSON.stringify(foodInfo));
    const dispatch = useDispatch();
    const [details, setDetails] = React.useState(false);
    const [unit,setUnit] = React.useState(null);
    const [amount,setAmount] = React.useState(1);
    const [items,setItems] = React.useState([{label:'',value:''}]);
    const [open, setOpen] = React.useState(false);
    
    const editable = route.params.editable;

    const notEditable = currentDate != FirebaseQuery.glicemyDateFormatter();

    console.log("IS EDITABLE? : " + !notEditable);

    const iconSelector = editable ? buttonIconsNames.edit : buttonIconsNames.plus;
    const addButtonText = editable ? "Edit Food" : "Add Food To Meal";

    const foodId = editable ? foodInfo.identifier : foodInfo.identifier;

    console.log("MY IDENTIFIER IS: " + JSON.stringify(foodId));
    const foodInitialAmount = editable ? foodInfo.quantity : 1;

    const errorFunc = (e) =>{
        dispatch(showError(e));
     }
    Food_API.errorFunc = errorFunc;

    //Retrive API food details data
    const getData = async (data)=>
    {
        console.log("GETTING DATA:");
        //RETRIVE DATA
        let res;
        res = (await Food_API.getIngredientDetailsAlternative(data.food_name));
        console.log("OK we get res->" + JSON.stringify(res));
        if(typeof(res.foods) === undefined){console.log("UFFFA");return;} 
        res = res.foods[0];

        console.log("AYOOOO");
        //DO SOME PREPROCESSING TO THE DATA 
        res = ApiHelper.enrichDatails(res);
        
        setAmount(foodInitialAmount);
        setUnit(editable?foodInfo.unit : res.serving_unit);
        console.log('default serving unit '+JSON.stringify(res.serving_unit))
        setItems(res.units);
        //SET DETAILS VARIABLE
        console.log("QQQQ:" + foodInfo.quantity);
        if(editable){
            console.log("IT WORKED");
            makeProportions(foodInfo.unit,foodInfo.quantity,res);
        }else{
            setDetails(res);
        }
        console.log("ENDED GET DATA:")
    }

    //Call on first render
    React.useEffect(()=>{
        console.log("Real use effect");
        getData(data);
    },[]);

    const addItem = () =>{
       if(unit!="container"){
        var food ={
            id:     data,
            name:   details.name,
            image:  details.image,
            cal:    details.current_calories ,
            carb:   details.current_total_carbohydrate,
            fat:    details.current_total_fat,
            prot:   details.current_protein,
            quantity: amount,
            unit: unit,
            identifier: foodId,
        }

        console.log("IL IDENTIFIER" + foodId);
        
        if(editable){
            console.log("SEND EDITTT")
            dispatch(editFood(food));
        }else{
            dispatch(addFood(food));
        }
        

        navigation.navigate('MealDiary',{});}
        else Alert.alert(
            "Missing Serving Unit!",
            "Please select an available unit",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
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

    const makeProportions = (item,qty=1,res=null) =>{

        let proportion;
        if(res == null){
            proportion = ApiHelper.makeProportion(details,item,qty);
        }else{
            console.log("ok")
            proportion = ApiHelper.makeProportion(res,item,qty);
        }
        console.log("prop:" + proportion);
        setDetails(proportion);
    }

    const deleteButton = () =>{
        return(
            <CustomImageButton disabled={notEditable} image={buttonIconsNames.bin} style={styles.addPlus} iconStyle={styles.addPlus} testID={"DeleteButtonID"} 
            onPress={() =>{
                dispatch(removeFood({
                    id:     data,
                    name:   details.name,
                    image:  details.image,
                    cal:    details.current_calories ,
                    carb:   details.current_total_carbohydrate,
                    fat:    details.current_total_fat,
                    prot:   details.current_protein,
                    quantity: amount,
                    unit: unit,
                    identifier: foodId,
                }));
                navigation.navigate('MealDiary',{});

            }}/>      
        );
    }
    
    console.log("AMMOUNT: " + JSON.stringify(amount));

    const renderDetails = () =>{
        return (
            
        <View style={{flex: 1,flexDirection: 'column',backgroundColor:colors.secondary}}>
            
            <ScrollView style={{flex:1}}>
            <View style={{flex: 2,backgroundColor: 'white'}}>
                <Image style={styles.foodImage} source={details.image!=null?{uri:details.image}:buttonIcons['defaultDiet'].uri}/>
                <View style={{marginTop:200,flexDirection:'row',alignContent:'center'}}>
                    <Text style ={styles.sectionTitle}> {details.name}</Text>
                    <CustomImageButton disabled={notEditable} image={iconSelector} style={styles.addPlus} iconStyle={styles.addPlus} onPress={addItem} testID={"AddButtonID"}/>
                    {editable?deleteButton():null}
                </View>
             </View>
            <View style={{flex: 4,backgroundColor: 'rgba(112,202,230, 0.30)',flexDirection:'column'}}>
                
                <View style={{flex:1.3,width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'white',borderRadius:10}}>
                    <View style={{marginLeft:10,marginRight:10,marginTop:10,flexDirection:'row'}}>
                        <TextInput editable={!notEditable} defaultValue={foodInitialAmount.toString()} style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'20%'}} onChangeText={a=>{updateAmount(a)}} placeholder='amount' keyboardType="numeric"/>
                        <DropDownPicker
                            disabled={notEditable}
                            zIndex={1000}
                            onSelectItem={(item) => {
                                makeProportions(item.value);
                            }}
                            containerStyle={{zIndex: 20}}
                            style={{width:'70%',marginLeft:'10%',}}
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
                        <Text style={{fontSize:28,color:'black'}}> {details.current_calories} </Text><Image source={mealIcons['cal'].uri} style={styles.macroImage} />
                    </View>
                </View>
                <View style={{zIndex:-1,flex:2,flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:10,backgroundColor:'white',borderRadius:10}}>
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
                <MacroTable title={"Details"}data={details}/>

                <View style={{flex:1,width:'90%',marginLeft:'5%',marginTop:10}}>
                    <CustomButton disabled={notEditable} style={styles.addButton} title={addButtonText} onPress={()=>{addItem()} }/>
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
    
    return{identifier: state.macroTracker.id,currentMeal: state.macroTracker.currentMeal,currentDate:state.macroTracker.currentDate};
  }
  
export default connect(mapStateToProps)(FoodDetails);