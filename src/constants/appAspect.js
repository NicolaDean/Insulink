import { Dimensions  } from 'react-native';

export const themeBlue = {
    white:"#fff",
    black:"black",
    primary:"rgb(112,202,230)",
    secondary:"",

};

export const colors = themeBlue;


const dimension = Dimensions.get('window');

export const dim = {
    height: dimension.height,
    width : dimension.width,
}