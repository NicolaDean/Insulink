import React, { Component } from 'react'; 
import { Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native'; 
export default class App extends Component { 
    constructor() { super(); this.state = { expanded: false } ;if (Platform.OS === 'android') { UIManager.setLayoutAnimationEnabledExperimental(true); } 
} 
changeLayout = () => { 
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    this.setState({ expanded: !this.state.expanded }); 
}
 render() {
      return (
           ì