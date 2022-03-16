import React from 'react';
import { Text, View, Image,TouchableHighlight, StyleSheet,Dimensions} from 'react-native';

export const Food = ({data,nav,activeView}) =>{

    let image = data.photo.thumb;
    let name = data.food_name;
    let id=data;
   
    const getDetails = (id) =>{
        nav.navigate('FoodDetails',{id : {id}}) 
    }
   
    return (
        <TouchableHighlight  style={ {justifyContent: 'center',
        alignItems:'center',margin:3}} underlayColor={"COLOR"}  onPress={()=>{getDetails(id)}}>
            <View style={activeView?styles.contentBox: {marginBottom:15, justifyContent: 'center',
            alignItems:'center',}}>
                <Text style={styles.title}>{name}</Text>
                
                <Image 
                    style={activeView?{width: dim.width*0.2, height: dim.width*0.2}: {width:70,height:70}}
                    source ={{uri:image}}/>
            </View>
        </TouchableHighlight>
       
    );


}
const styles = StyleSheet.create(
    {
        contentBox:{
            width: dim.width*0.3, height: dim.width*0.3,
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

