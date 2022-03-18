import React,{ useState,useEffect, useContext } from 'react';
import { Text, View, Image,TouchableHighlight, StyleSheet,Dimensions, Vibration,LayoutAnimation} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dim } from '../../constants/appAspect';
import CustomImageButton from '../../customComponents/customImageButton'


export const Food = ({data,nav,deletable}) =>{

    const [expanded,setExpanded] = useState( false )
    let image = data.photo.thumb;
    let name = data.food_name;
    let id=data;
   
    const getDetails = (id) =>{
        nav.navigate('FoodDetails',{id : {id}}) 
    }
    const expandMeal = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpanded(expanded => !expanded); 
    }

    const deleteFood = (id) =>{
        console.log('deleted food'+id)
    }
    

    const showExpansion = () =>{
        return (
            <View >
                <CustomImageButton image='camera'   iconStyle={styles.deleteButton}
              onPress={() => {deleteFood(id)}}/>
            </View> );
    }

    return (
        <SafeAreaView>
             
        <TouchableHighlight  style={ {justifyContent: 'center',
        alignItems:'center',margin:3}} underlayColor={"COLOR"}  onPress={()=>{getDetails(id)} } onLongPress={expandMeal}>
            <View style={styles.contentBox}>
            {
            //SHOW THE DELET BUTTON
            (expanded && deletable) ? (showExpansion()):null
        }
                <Text style={styles.title}>{name}</Text>
                
                <Image 
                    style={{width: dim.width*0.2, height: dim.width*0.2}}
                    source ={{uri:image}}/>
            </View>
        </TouchableHighlight>
    
        
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
            marginBottom:5,
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
        },deleteButton:{
            width: Dimensions.get('window').width*0.05,
            height: Dimensions.get('window').height*0.05,
            resizeMode: 'contain',
            left:dim.width*0.15,
          }
    
    }
);

//<Text>{data.label},{data.category}, {data.categoryLabel}</Text>
export default Food;

