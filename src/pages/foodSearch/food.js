import React,{ useState,useEffect, useContext } from 'react';
import { Text, View, Image,TouchableHighlight, StyleSheet,Dimensions, Vibration,LayoutAnimation} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dim } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton'
import { Shake } from "react-native-motion";
import { useDispatch } from 'react-redux';
import { removeFood } from '../../stateManager/reduxStates/actions/macroTracker';
import { connect } from 'react-redux';
import { buttonIcons } from '../../assets/buttonIcons';


export const Food = ({data,nav,deletable,identifier=0,sport=false}) =>{

    const [expanded,setExpanded] = useState( false )
    const [state,setState] = useState( 0)
    const dispatch = useDispatch();
    let id = {};
    if(deletable){
        id = data.id;
        
    }else{
        id=data;
    }
    let image =sport?null: id.photo.thumb;
    var name = sport? data.name.toString(): id.food_name;
   
    //const sportIMG=buttonIcons[].uri;
    const getDetails = () =>{
        console.log("DET: " + JSON.stringify(data));
        nav.navigate('FoodDetails',{data : id,foodInfo:data,editable : deletable}) 
        setExpanded(false);
    }
    const expandMeal = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpanded(expanded => !expanded); 
        if (deletable) {
            setState(state+1);
            
        }
    }
    
    

    const deleteFood=() =>{
        console.log('deleted food'+id)
        dispatch(removeFood(data));
    }
    const deleteSport=() =>{
        console.log('deleted sport'+id)
        //TODO DISPATCH 
    }
    

    const showExpansion = () =>{
        return (
            <View >
                <Shake value={state} type="timing" useNativeDriver={true}>
                    <CustomImageButton  image='delete' 
                                        iconStyle={styles.deleteButton}
                                        onPress={()=>{sport?deleteSport():deleteFood()}}
                    />
              </Shake>
            </View> );
    }
   

    const deletableStyle = [styles.contentBox,{width: dim.width*0.4, height: dim.width*0.4}];
    const normalStyle    = [styles.contentBox,{width: dim.width*0.3, height: dim.width*0.3,paddingTop:20}];
    return (
        <SafeAreaView >
        <Shake value={state} type="timing" useNativeDriver={true}>
            <TouchableHighlight  style={ {justifyContent: 'center',alignItems:'center',margin:3}}
                                underlayColor={"COLOR"}  
                                onPress={()=>{sport?null:getDetails()}} 
                                onLongPress={expandMeal}
            >
                <View style={deletable? deletableStyle:normalStyle}>
                    {
                        //SHOW THE DELET BUTTON
                        (expanded && deletable) ? (showExpansion()):null
                    }
                    <Text style={styles.title}>{name}</Text>
                        
                    <Image 
                        style={{width: dim.width*0.2, height: dim.width*0.2}}
                        source ={sport? buttonIcons[data.name].uri: {uri:image}}
                    />
                <Text>{(deletable && sport)? (data.duration+' minutes'):(deletable && !sport)?(data.quantity +" - "+ data.unit):null}</Text>
                </View>
            </TouchableHighlight>
        </Shake>
        </SafeAreaView>
       
    );


}
const styles = StyleSheet.create(
    {
        contentBox:{
            width: dim.width*0.4, height: dim.width*0.4,
            justifyContent: 'center',
            alignItems:'center',
            marginHorizontal:3,
            borderRadius:30,
            backgroundColor:"white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4
        },
        title:{
            
            fontSize:13,
            
            marginBottom:5,
            fontWeight:"bold",
            alignSelf:'center'
        },deleteButton:{
            width: Dimensions.get('window').width*0.07,
            height: Dimensions.get('window').height*0.07 ,
            resizeMode: 'contain',
            left:dim.width*0.18,
            bottom:4
          }
    
    }
);

//<Text>{data.label},{data.category}, {data.categoryLabel}</Text>
export default (Food);
