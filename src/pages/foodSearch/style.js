import { StyleSheet} from 'react-native';
import { RollInRight } from 'react-native-reanimated';
import {Dimensions  } from 'react-native';
import { colors, dim } from '../../constants/appAspect';

const screenWidth = Dimensions.get("window")

export default StyleSheet.create({
    sectionContainer: {
      justifyContent: 'center',
       alignItems:'center',
      flex:1
            
    },
    shadowEffect:{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    macroContainer:{
      flexDirection:'column',
      marginTop:10,
      margin:3, 
      justifyContent: 'center',
      alignItems:'center',
    },
    macroImage: {    
      width: 30,
      height:30,
    },
    header:{
      flexDirection:'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.white,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    sectionTitle: {
      alignSelf:'center',
      color:"black",
      fontSize: 30,
      fontWeight: '600',
    },
    addPlus:{
      alignSelf:'flex-end',
      width: Dimensions.get('window').width*0.1,
      height: Dimensions.get('window').height*0.1,
      resizeMode: 'contain',
      top:0,
      marginLeft:20
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    searchBox: { 
      fontSize: 18,
      width: "50%",
      marginLeft:10
    },
    foodImage: {
      position:'absolute',
      zIndex:-1,
      width: 200,
      height: 200,
      alignSelf:'center'
    
     },
      graphLegend: {
      },
      graphBox:{
        
        marginLeft:"5%",
        width:"90%",
        borderRadius:40,
        backgroundColor:"#F7F7F7",
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
      },     
        appLogoContainer: {
          
      },
      LogoSize: {

  width: Dimensions.get('window').width*0.1,
  height: Dimensions.get('window').height*0.1,
  resizeMode: 'contain',
  top:0,

  marginLeft:20
      },
      food:{
        justifyContent: 'center',
        alignItems:'center',
          },deleteButton:{
        width: Dimensions.get('window').width*0.1,
        height: Dimensions.get('window').height*0.1,
        resizeMode: 'contain',
        top:0,
      }

  });