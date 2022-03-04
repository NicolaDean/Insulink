import { StyleSheet} from 'react-native';
import { Dimensions  } from 'react-native';

/*
Use device sizes
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
*/

export default StyleSheet.create({

      mealContainer:{
          width:"90%",
          height:"30",
          marginLeft:"5%",
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62
      },
      
  });
