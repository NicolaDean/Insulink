import React, { useState } from 'react';
import { Text, StyleSheet,TouchableOpacity, View,LayoutAnimation} from 'react-native';
import { colors } from '../constants/appAspect';
import CalendarPicker from 'react-native-calendar-picker';


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
                <Text>Expanded</Text>
                <CalendarPicker
                    onDateChange={onDateChange}
                />
            </View>
        );
    }

    const notExpanded = () =>{
        return(
            <View>
                 <Text>Not Expanded</Text>
            </View>
        );
    }

    const onDateChange = (date) =>{
        //TODO ADD A REDUX ACTION TO RETRIVE DATA FROM LOCALSTORAGE/FIREBASE AND SHOW THEM
        setDate(date);
    }

    return (
        <View>
            <TouchableOpacity onPress={expandCalendar}>
                <Text>{currentDate.toString()}</Text>
                {isexpanded ? expanded():notExpanded()}
            </TouchableOpacity>
        </View>
    );
}