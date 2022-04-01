import React, { useEffect, useState } from 'react';
import {Image,View } from 'react-native';
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
import CustomImageButton from '../../customComponents/customImageButton';
import { bottomNavHeader, CustomHeader, header } from './header';
import { useDispatch } from 'react-redux';
import { loadUserLocalData } from '../../stateManager/reduxStates/actions/userAction';
import Login from '../login/login';


const Tab = createBottomTabNavigator();

const tabBarIcon = (icon) => ({
    focused,
    color,
    size,
  }) => <Image source={icon.uri} style={{width:40,height:40}}></Image>;

  
export const BottomTab = ({navigation}) => {

	const dispatch = useDispatch();


	return(
		<Tab.Navigator
			screenOptions={bottomBarStyle}
			initialRouteName={screenNames.home}
			tabBar={(props) => (
			<BottomFabBar color={colors.primary} {...props} isRtl={false}/>
		)}>

		<Tab.Screen
			name={screenNames.foodSearch}
			options={bottomNavHeader(navigationIcons.foodSearch)}
			component={FoodSearch}
		/>
		<Tab.Screen
			name={screenNames.home}
			options={bottomNavHeader(navigationIcons.home)}
			component={home}
		/>
	 <Tab.Screen
			name={screenNames.mealDiary}
			options={bottomNavHeader(navigationIcons.mealDiary)}
			component={mealDiary}
		/>
	</Tab.Navigator>
	);

    
}

export default BottomTab;