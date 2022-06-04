import { StyleSheet} from 'react-native';
import { Dimensions ,Platform } from 'react-native';
import { colors, dim } from '../../constants/appAspect';

/*
Use device sizes
width: dim.width,
height: Dimensions.get('window').height
*/

export default StyleSheet.create({
      sectionContainer:{
        
      },
      title:{
          fontSize:30,
          fontWeight:"bold",
          color:colors.black,
          alignSelf:'center',
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
        backgroundColor:colors.white,
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
        flexDirection:'row'
      },
      mealName:{
          fontSize:Platform.isPad!=true?20:30,
          fontWeight:"bold",
          marginLeft:5,
          alignSelf:'flex-start',
          justifyContent:'flex-start',
          marginVertical:Platform.isPad!=true?"14%":'3%',
          marginRight:10,
      },
      mealImage:{
        alignSelf: 'center',
        marginLeft:10,
        width: Platform.isPad!=true?20:50,
        height: Platform.isPad!=true?20:50,
      },
      addBox:{
        flexShrink:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'baseline'
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
        width: dim.width*0.2,
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
      },
      chartStyle: {
        marginLeft:15,
        top: "5%",
        borderRadius: 15,
        marginVertical: 8,
        borderRadius: 15,
        },
      mealView:{
        flexDirection: 'column',
        justifyContent: 'center',
        width: "90%",
        marginLeft:"5%",
        backgroundColor:colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius:15,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 20,

      },
      container: { 
        flex:1 ,
        zIndex: 1 ,
        paddingHorizontal: 10,},
        text: { 
          fontSize: 17,
          padding: 10 
        },
        btnText: {
          flex:1 ,
          zIndex: 1 ,
          fontSize: 20 
        },
        btnTextHolder: {
          zIndex: 1 
        },
        Btn: { 
          marginTop: "5%",
          flexDirection:'row',
          zIndex: 1 
        },
        foodText:{
          fontSize:20,
          marginLeft:5,
          marginTop:5
        },
        foodImage:{
          marginTop:5,
          marginLeft:10,
          width: 30,
          height: 30,
        },
        food:{
          justifyContent: 'center',
          alignItems:'center',
          borderRadius:15
        },
        wrapper: {
          height:Dimensions.get("window").height*0.40
        },
        slide: {
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
        },sportImageContainer: {
          marginVertical:'10%',
          marginHorizontal:'5%'
        } ,
        sportImage: {
          width: 64,
          height: 64,
        },grid:{
          marginTop:'10%',
          justifyContent: 'center',
       alignItems:'center',
        },appButtonContainer: {
          backgroundColor: colors.primary,
          borderRadius: 10,
         alignSelf:'center',
         marginHorizontal:5
        }

                  
  });
