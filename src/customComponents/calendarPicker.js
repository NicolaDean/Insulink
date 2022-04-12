import React, { useState } from 'react';
import { Text, Image,StyleSheet,TouchableOpacity, View,LayoutAnimation} from 'react-native';
import { colors } from '../constants/appAspect';
import CalendarPicker from 'react-native-calendar-picker';
import CustomImageButton from './customImageButton';
import { buttonIcons } from '../assets/buttonIcons';


export const Calendar = () => {

    const [currentDate,setDate] = useState(new Date());
    const [isexpanded,setExpanded] = useState(false);

    const expandCalendar = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpanded(expanded => !expanded); 
    }
    
    const expanded = () =>{
        return(
            <View>
                <CalendarPicker
                    onDateChange={onDateChange}
                />
            </View>
        );
    }

    const notExpanded = () =>{
        return(
            <View>
            </View>
        );
    }

    const onDateChange = (date) =>{
        //TODO ADD A REDUX ACTION TO RETRIVE DATA FROM LOCALSTORAGE/FIREBASE AND SHOW THEM
        setDate(date);
    }

    return (
        <View style={{justifyContent:'center',alignContent:'center',alignSelf:'center',flexDirection:'column'}}>
            <TouchableOpacity onPress={expandCalendar}>
                <View style={{justifyContent:'space-evenly',alignContent:'stretch',alignSelf:'center',flexDirection:'row',marginVertical:10}}>
                <Text style={{alignSelf:'center',marginHorizontal:10}} >{currentDate.toString().slice(0,10)}</Text>
                <Image source={buttonIcons['calendar'].uri} style={styles.icon} /> 
                </View>
                {isexpanded ? expanded():notExpanded()}
            </TouchableOpacity>
        </View>
    );
}

const styles =  StyleSheet.create({
    icon:{
        width: 32,
         height: 32,
         position: 'relative',
         top:0,
         bottom:10,
        }
});