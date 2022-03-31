
import React from 'react';
import { Text, StyleSheet,TouchableOpacity, View} from 'react-native';
import { colors } from '../constants/appAspect';

//Color light blue --> #70CAE6

export const CustomButton = (
    {   onPress,
        title="Button",
        style,
        useDefaultStyle=true
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity onPress={onPress} style={useDefaultStyle?styles.appButtonContainer: null}>
                        <Text style={styles.appButtonText}>{title}</Text>
                    </TouchableOpacity>
            </View>
           
        );
}

const styles =  StyleSheet.create({
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
        margin:20
      }
});

export default CustomButton;