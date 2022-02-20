import React from 'react';
import { Text, View, Image } from 'react-native';


export const Food = (props) =>{
    console.log("-------------");
    
    let data = props.data;
    let image = data.image;

    console.log(data);
    return (
        <View>
            <Text>{data.label},{data.category}, {data.categoryLabel}</Text>
            <Image 
                style={{width: 100, height: 100}}
                source ={{uri:image}}/>
        </View>
    );
   
}
export default Food;