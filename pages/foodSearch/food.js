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
            <View style={styles.contentBox}>
                <Text style={styles.title}>{name}</Text>
                
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
const styles = StyleSheet.create(
    {
        contentBox:{
            width:"90%",
            marginTop:10,
            marginLeft:"5%",
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
            marginLeft:20,
            fontSize:20,
            fontWeight:"bold"
        }
    }
);

//<Text>{data.label},{data.category}, {data.categoryLabel}</Text>
export default Food;

