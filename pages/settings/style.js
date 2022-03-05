import { StyleSheet} from 'react-native';


export default StyleSheet.create({
  header:{
    flexDirection:'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginBottom: "5%",
    backgroundColor: "rgba(112,202,230,1)"
  },
  headerTitle:{
    fontSize:20 ,   marginBottom: "5%",
    margin:"5%", 
    fontWeight: "bold",
  },
  sectionContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
        flex:1,
        marginTop:"5%"
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
    fieldTitle:{
      marginLeft:"5%",
      fontSize:30,
      top:"2%"
    },
    value:{
      fontSize:30,
      marginLeft:"2%",
      top:"2%"

    },
    fieldContainer:{
    
      margin:5,
      width:"90%",
      height: "10%",
      marginLeft:"5%",
      flexDirection:'row',
      backgroundColor: "white",
      borderRadius: 17,
    borderWidth: 3,
    borderColor: '#fff'
    },
    field:{
      fontSize:30,
      marginLeft:"2%",
    } 

  });