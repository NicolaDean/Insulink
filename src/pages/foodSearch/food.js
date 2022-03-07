import React,{useContext} from 'react';
import { Text, View, Image,TouchableHighlight, StyleSheet,Dimensions} from 'react-native';
import { MealDataContext } from '../../stateManager/mealsDataProvider';

export const Food = (props) =>{


    //const {mealType,foodList} = useContext(MealDataContext);
    

    let data = props.data;
    let name ="";
    let image;
    let id;

    //let data = {name:"",photo:"https://it.wikipedia.org/wiki/Mela#/media/File:Sundown_and_cross_section.jpg"}
    if(props.api){
        image = data.photo.thumb;
        name = data.food_name;
        //console.log("FOOD : " + JSON.stringify(data));
        id=data;
    }else{
        //Spoonacular
        id = data.id;
        image = "https://spoonacular.com/cdn/ingredients_100x100/" + data.image;
        name = data.name;
    }
   

    

    
    
    return (
        <TouchableHighlight  style={{    justifyContent: 'center',
        alignItems:'center',margin:3}}underlayColor={"COLOR"}  onPress={()=>{props.nav.navigate('FoodDetails',{id : {id}}) }}>
            <View style={styles.contentBox}>
                <Text style={styles.title}>{name}</Text>
                
                <Image 
                    style={{width: Dimensions.get('window').width*0.2, height: Dimensions.get('window').width*0.2}}
                    source ={{uri:image}}/>
            </View>
        </TouchableHighlight>
       
    );

    const getDetails = (data) =>{
        props.nav.navigate('FoodDetails',{data : {data}}) 
    }
   
}
const styles = StyleSheet.create(
    {
        contentBox:{
            width: Dimensions.get('window').width*0.3, height: Dimensions.get('window').width*0.3,
            justifyContent: 'center',
            alignItems:'center',
            marginHorizontal:3,
            marginTop:15,
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
            
            fontSize:15,
            marginBottom:10,
            fontWeight:"bold"
        }
    }
);

//<Text>{data.label},{data.category}, {data.categoryLabel}</Text>
export default Food;

