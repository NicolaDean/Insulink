import { StyleSheet} from 'react-native';
import { Dimensions  } from 'react-native';

/*
Use device sizes
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
*/

export default StyleSheet.create({
      sectionContainer:{
        
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
        flexDirection:'row'
      },
      mealName:{
          fontSize:20,
          fontWeight:"bold",
          marginLeft:5,
          alignSelf:'flex-start',
          justifyContent:'flex-start',
          marginVertical:"14%",
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
        },
        chartStyle: {
          marginRight:10,
          marginLeft:"5%",
        top: "5%",
        borderRadius: 15,
        marginVertical: 8,
        borderRadius: 15,
        }
      ,
      container: { 
        flex:1 ,
        zIndex: 1 ,
        paddingHorizontal: 10,},
         text: { 
           fontSize: 17,
             padding: 10 },
              btnText: {
                flex:1 ,
                zIndex: 1 ,
                  fontSize: 20 
                }
                , btnTextHolder: {
                  zIndex: 1 
                  },
                    Btn: { 
                      marginTop: "5%",
                      flexDirection:'row',
                      zIndex: 1 
                      },foodText:{
                        fontSize:20,
                        marginLeft:5,
                        marginTop:5
                      },
                      foodImage:{
                        marginTop:5,
                          marginLeft:10,
                          width: 30,
                          height: 30,
                        
                      },food:{
                        justifyContent: 'center',
                        alignItems:'center',
                      
                      },

                  
  });
