import React, { useState } from 'react';
import {ScrollView,View,StyleSheet,Text,Image} from 'react-native';
import { buttonIcons } from '../../../assets/buttonIcons';
import { colors } from '../../../constants/appAspect';
import { MarginContainer } from '../../../customComponents/containers/marginContainer';

export const Title = ({children}) =>{
        return(
            <Text style={styles.title}>{children}</Text>
        );
    }

export const Icon = ({icon="plus"}) =>{
        return(
            <Image source={buttonIcons[icon].uri} style={styles.icons} ></Image>
        );
    }

export const Row = ({children,width,style}) =>{
        return(
            <MarginContainer style={[style,{flexDirection:'row'}]}  width={width}>
                {children}
            </MarginContainer>
        );
    }

export   const Col = ({children,width}) =>{
        return(
            <MarginContainer style={{flexDirection:'col'}} width={width}>
                {children}
            </MarginContainer>
        );
    }

 export   const MacroIcon = ({color}) =>{
        return(
            <View style={[styles.macrolegend,{backgroundColor:color}]}/>
        );
    }



const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    icons:{
        width:60,
        height:60
    },
    field:{
        flexDirection:'row'
    },
    macrolegend:{
        width:30,
        height:30,
        borderRadius:20,
        
    },
    macroWrites:{
        color:colors.black,
        fontWeight:'bold'
    },
    phisicInfo:{
        alignSelf:'center',
        color:colors.white,
        fontSize:20,
        marginLeft:10,
        fontWeight:'bold'
    },
    userName:{
        fontSize:20,
        color:colors.white
    },
    macroChart:{
        backgroundColor:colors.white,
        color:colors.black
    }
});