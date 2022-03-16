//REACT LIBRARY
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet,Text,View } from 'react-native';

//ALL PAGES OF APP
import FoodSearchExample from './src/pages/foodSearch/foodSearchExample';
import Home from './src/pages/home/home';
import EditPersonalData from './src/pages/settings/editPersonalData';
import  FoodDetails  from './src/pages/foodSearch/foodDetails';
import  PersonalData  from './src/pages/settings/personalData';
import  MealDiary  from './src/pages/diary/mealDiary';
import { AddMeal } from './src/pages/diary/addMeal';

//REDUX
import { store } from './src/stateManager/reduxStates/store';
import { Provider, useDispatch } from 'react-redux';
import Login from './src/pages/login/login';


const Stack = createNativeStackNavigator();

const App = () => {
 


    //options={{ headerShown: false }}
  return(
    
    <NavigationContainer>
      <Provider store={store}>     
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="FoodSearch" component={FoodSearchExample} />
              <Stack.Screen name="FoodDetails" component={FoodDetails}/>
              <Stack.Screen name="MealDiary" component={MealDiary}/>
              <Stack.Screen name="AddMeal" component={AddMeal}/>          
              <Stack.Screen name="PersonalData" component={PersonalData}/>
              <Stack.Screen name="EditPersonalData" component={EditPersonalData}/>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </Provider>

  </NavigationContainer>

  
  );
};

const Scc = ({navigation}) =>{
  return <Text>BANANAAAA</Text>;
}
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
