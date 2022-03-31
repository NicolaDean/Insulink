import React from 'react';
import {Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomFabBar} from 'rn-wave-bottom-bar';

//PAGES
import FoodSearch from '../foodSearch/foodSearch';
import home from '../home/home';
import mealDiary from '../diary/mealDiary';

//CONSTANTS
import { colors } from '../../constants/appAspect';
import { navigationIcons } from '../../assets/navigationIcons';
import { bottomBarStyle, screenNames } from './configuration';


const Tab = createBottomTabNavigator();

const tabBarIcon = (icon) => ({
    focused,
    color,
    size,
  }) => <Image source={icon.uri} style={{width:40,height:40}}></Image>;

  
export const BottomTab = () => {
    return(
        <Tab.Navigator
            screenOptions={bottomBarStyle}
            initialRouteName={screenNames.home}
		    tabBar={(props) => (
			<BottomFabBar color={colors.primary} {...props} isRtl={false}/>
		)}>

        <Tab.Screen
			name={screenNames.foodSearch}
            options={{tabBarIcon: tabBarIcon(navigationIcons.foodSearch)}}
			component={FoodSearch}
		/>
		<Tab.Screen
			name={screenNames.home}
			options={{tabBarIcon: tabBarIcon(navigationIcons.home)}}
			component={home}
		/>
     <Tab.Screen
			name={screenNames.mealDiary}
			options={{tabBarIcon: tabBarIcon(navigationIcons.mealDiary)}}
			component={mealDiary}
		/>
    </Tab.Navigator>
    );
}

export default BottomTab;