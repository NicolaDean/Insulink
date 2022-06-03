import { StyleSheet} from 'react-native';
import { Dimensions,Platform ,useWindowDimensions } from 'react-native';
import { colors, dim } from '../../constants/appAspect';

const screenWidth = Dimensions.get("window")



export default StyleSheet.create({
    sectionContainer: {
      marginTop: 30,
      paddingHorizontal: 25,
      
    }, wrapper: {
      height:Dimensions.get("window").width<Dimensions.get("window").height?Dimensions.get("window").height*0.37:Dimensions.get("window").height*0.45,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      margin:5
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
    },
      appButtonText:{
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 60
            },
            slide: {
              justifyContent: 'space-evenly',
              alignItems: 'stretch',
            },icon:{
               width:Platform.isPad!=true? Dimensions.get("window").width*0.18:Dimensions.get("window").width<Dimensions.get("window").height?Dimensions.get("window").width*0.2:Dimensions.get("window").width*0.1,
               height:Platform.isPad!=true? Dimensions.get("window").width*0.18:Dimensions.get("window").width<Dimensions.get("window").height?Dimensions.get("window").width*0.2:Dimensions.get("window").width*0.1,
                position: 'relative',
                top:0,
                bottom:10}
            
  });