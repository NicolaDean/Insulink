import React from 'react';
import { Text, View} from 'react-native';
import styles from './style'

import {  } from 'react-native-gesture-handler';
import CustomButton from '../../customComponents/customButton';

import Meal from './meal';
import { VictoryPie } from 'victory-native';

const data = [
    {x:"Carb",y:100 },
    { x: "Fat",y:20},
    {x: "Prot",y:60 }
]

export const MealDiary = ({navigation}) =>{

return (
 //TODO ADD THE TOTAL MEALS MACRO GRAPH
<View>
        <Text style={styles.title}>Today's Meals:</Text>
        <View style={styles.graphBox}> 
            <VictoryPie 
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={data}
                width={200}
                height={200}
                innerRadius={30}
                style={{
                    labels: {
                    fill: 'gray', fontSize: 20, padding: 7,
                }, }}
                /> 
        </View>
                

        <Meal navigation = {navigation} name ="Colazione"   icon ="breakfast"   id="breakfast"/>
        <Meal navigation = {navigation} name ="Pranzo"      icon ="lunch"       id="lunch"/>
        <Meal navigation = {navigation} name ="Cena"        icon ="dinner"      id="dinner"/>
        <Meal navigation = {navigation} name ="Snack"       icon ="snack"       id="snack"/>

        <CustomButton title='Add Custom Meal' onPress={()=>{}}/>
</View>
    );
}//<CustomImageButton tile="Home" image='plus' style={styles.appLogoContainer}  iconStyle={styles.LogoSize}/>
    
/** */
export default MealDiary;

