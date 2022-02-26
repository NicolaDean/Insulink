
import React from 'react';
import { Text, StyleSheet,TouchableOpacity, View} from 'react-native';


export const CustomButton = (
    {   onPress,
        title="Button",
        style
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>{title}</Text>
                    </TouchableOpacity>
            </View>
           
        );
}

const styles =  StyleSheet.create({
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
        paddingHorizontal: 12
      }
});

export default CustomButton;