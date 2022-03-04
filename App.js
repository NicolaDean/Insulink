import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet,Text,View } from 'react-native';


//ALLOW TO IMPORT OUR COMPONENTS FROM SEPARATE FILE
import FoodSearchExample from './pages/foodSearch/foodSearchExample';
import Home from './pages/home/home';
import EditPersonalData from './pages/settings/editPersonalData';
import { FoodDetails } from './pages/foodSearch/foodDetails';
import { PersonalData } from './pages/settings/personalData';
import { MealDiary } from './pages/diary/mealDiary';
import { AddMeal } from './pages/diary/addMeal';
import { UserDataProvider } from './stateManager/userDataProvider';
import { MealDataProvider } from './stateManager/mealsDataProvider';


const Stack = createNativeStackNavigator();

const App = () => {
 
  return(
    
    <NavigationContainer>
        <UserDataProvider>
          <MealDataProvider>          
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="FoodSearch" component={FoodSearchExample} />
            <Stack.Screen name="FoodDetails" component={FoodDetails}/>
            <Stack.Screen name="MealDiary" component={MealDiary}/>
            <Stack.Screen name="AddMeal" component={AddMeal}/>          
            <Stack.Screen name="PersonalData" component={PersonalData}/>
            <Stack.Screen name="EditPersonalData" component={EditPersonalData}/>
          </Stack.Navigator>
          </MealDataProvider>
        </UserDataProvider>
        

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
