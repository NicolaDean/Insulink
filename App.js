//REACT LIBRARY
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet,Text,View,Image } from 'react-native';

//ALL PAGES OF APP
import FoodSearch from './src/pages/foodSearch/foodSearch';
import Home from './src/pages/home/home';
import EditPersonalData from './src/pages/settings/editPersonalData';
import  FoodDetails  from './src/pages/foodSearch/foodDetails';
import  PersonalData  from './src/pages/settings/personalData';
import  MealDiary  from './src/pages/diary/mealDiary';

//REDUX
import { store } from './src/stateManager/reduxStates/store';
import { Provider } from 'react-redux';
import Login from './src/pages/login/login';
import  SportActivity from './src/pages/diary/sportActivity';

import CustomImageButton from './src/customComponents/customImageButton';
import { Button } from 'react-native-paper';
import { colors } from './src/constants/appAspect';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTab from './src/pages/navigationTab/bottomTab';
import home from './src/pages/home/home';
import { header } from './src/pages/navigationTab/header';
import Registration from './src/pages/login/register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
//{headerShown: false}
  return(
    
    <NavigationContainer>
      <Provider store={store}>    
            <Stack.Navigator initialRouteName={"Login"}>
              <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
              <Stack.Screen name="FoodDetails" component={FoodDetails} options={header}/>
              <Stack.Screen name="SportActivity" component={SportActivity}options={header} />

              <Stack.Screen name="PersonalData" component={PersonalData}options={header}/>
              <Stack.Screen name="EditPersonalData" component={EditPersonalData}options={header}/>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />

            </Stack.Navigator>
        </Provider>

  </NavigationContainer>

  
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
