import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home} from '../home/home'
import {FoodSearchExample} from '../foodSearch/foodSearchExample';


const Tab = createBottomTabNavigator();
export const BottomNavigator = () =>{

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="ba" component={Home} />
                <Tab.Screen name="Meal Insert" component={FoodSearchExample} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}