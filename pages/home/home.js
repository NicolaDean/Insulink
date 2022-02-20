import React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';


export default Home = ({ navigation }) =>{

    return(
            <Button 
                title='Food Search'
                onPress={() => navigation.navigate('FoodSearch',{}) }/>
    );
}