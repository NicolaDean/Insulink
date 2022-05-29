import { StyleSheet} from 'react-native';
import { Dimensions,Platform  } from 'react-native';
import { colors, dim } from '../../constants/appAspect';

const screenWidth = Dimensions.get("window")

export default StyleSheet.create({
    sectionContainer: {
      marginTop: 30,
      paddingHorizontal: 25,
    }, wrapper: {
      height:Dimensions.get("window").height*0.40
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
               width:Platform.isPad!=true? Dimensions.get("window").width*0.18:Dimensions.get("window").width*0.21,
                height:Platform.isPad!=true? Dimensions.get("window").width*0.18:Dimensions.get("window").width*0.21,
                position: 'relative',
                top:0,
                bottom:10}
            
  });