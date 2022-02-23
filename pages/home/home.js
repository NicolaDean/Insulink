import React from 'react';
import {TouchableOpacity, Text, View,Button, StyleSheet } from 'react-native';
import styles from './style'


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>);


export default Home = ({ navigation }) =>{

    return(
            <AppButton
                title='Food Search'
                onPress={() => navigation.navigate('FoodSearch',{}) }/>
    );
}