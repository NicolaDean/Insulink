import React from 'react';
import { Text, View, Image,TouchableHighlight, StyleSheet} from 'react-native';


export const Food = (props) =>{

    let data = props.data;

    //Spoonacular
    let id = data.id;
    let image = "https://spoonacular.com/cdn/ingredients_100x100/" + data.image;
    let name = data.name;

    
    return (
        <TouchableHighlight  underlayColor={"COLOR"}  onPress={()=>{props.nav.navigate('FoodDetails',{id : {id}}) }}>
            <View>
                <Text>{name}</Text>
                
                <Image 
                    style={{width: 100, height: 100}}
                    source ={{uri:image}}/>
            </View>
        </TouchableHighlight>
       
    );

    const getDetails = (data) =>{
        props.nav.navigate('FoodDetails',{data : {data}}) 
    }
   
}
//<Text>{data.label},{data.category}, {data.categoryLabel}</Text>
export default Food;