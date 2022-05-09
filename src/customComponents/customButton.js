
import React from 'react';
import { Text, StyleSheet,TouchableOpacity, View} from 'react-native';
import { colors } from '../constants/appAspect';

//Color light blue --> #70CAE6

export const CustomButton = (
    {   onPress,
        title="Button",
        style,
        useDefaultStyle=true,
        disabled = false
    }) =>{

        return(
            <View style={style}>
                    <TouchableOpacity disabled={disabled}onPress={onPress} 
                        style={[useDefaultStyle?styles.appButtonContainer: null,
                                disabled?styles.disabledButton:null,style]}>
                        <Text style={[styles.appButtonText,
                                      disabled?styles.disabledButton:null]}>{title}</Text>
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
        elevation: 0,
        backgroundColor: colors.primary ,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:20
      },
      disabledButton:{
        backgroundColor: colors.white,
        color: colors.black
      }
});

export default CustomButton;