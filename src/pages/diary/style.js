import { StyleSheet} from 'react-native';
import { Dimensions  } from 'react-native';

/*
Use device sizes
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
*/

export default StyleSheet.create({
      sectionContainer:{
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        flex:1,
      },
      title:{
          fontSize:30,
          fontWeight:"bold",
          color:"black",
          alignSelf:'flex-start',
          marginLeft:"5%",
          marginTop:10
      },
      graphBox:{
         width:"60%",
         marginLeft:"20%",
      },
      mealContainer:{
        width:"90%",
        height: "10%",
        marginLeft:"5%",
        marginTop:10,
        backgroundColor:"white",
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius:15,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      mealName:{
          fontSize:20,
          fontWeight:"bold",
          marginLeft:15,
          alignSelf:'center',
          marginRight:10,
      },
      mealImage:{
        alignSelf: 'center',
        marginLeft:10,
        width: 20,
        height: 20,
      },
      addBox:{
        width:"100%",
        flexShrink:1,
        flexDirection:'row',
        justifyContent:'flex-end',
      },
      addIcon:{
        alignSelf: 'center',
        marginRight:10,
        width: 20,
        height: 20,
      },
      appLogoContainer: {
              justifyContent: 'center',
              alignItems: 'center',
      },
      LogoSize: {

        width: Dimensions.get('window').width*0.2,
        height: Dimensions.get('window').height*0.2,
        resizeMode: 'contain',
        top: Dimensions.get('window').height*0.75,
          },
          mealBar: {
              
          },
          macroImage: {
            
            width: 30,
        height:30,
          },
          macroContainer:{
            flexDirection:'column',
            marginTop:10,
            margin:3, 
            justifyContent: 'center',
          alignItems:'center',
        }
                  
  });
