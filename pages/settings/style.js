import { StyleSheet} from 'react-native';


export default StyleSheet.create({
  sectionContainer: {
    justifyContent: 'center',
     alignItems: 'left',
        
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
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "rgba(112,202,230,1)",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 60
            },
            fieldTitle:{
              fontSize: 24,
              
            },
            fieldContainer:{
              fontSize: 18,

            }

  });