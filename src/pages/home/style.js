import { StyleSheet} from 'react-native';
import { Dimensions  } from 'react-native';
import { colors, dim } from '../../constants/appAspect';

const screenWidth = Dimensions.get("window")

export default StyleSheet.create({
    sectionContainer: {
      marginTop: 30,
      paddingHorizontal: 25,
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
            }
  });