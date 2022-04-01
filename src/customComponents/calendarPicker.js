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
           <Image source={buttonIcons['calendar'].uri} style={styles.icon} /> 

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
                <Text >{currentDate.toString()}</Text>
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
        alignSelf:'center'
        ,marginVertical:10}
});