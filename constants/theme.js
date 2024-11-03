import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#FFB703",
    secondary: "#8ECAE6",
    tertiary: "#FB8500",

    gray1 : "#DEDEDE",
    gray2 : "#CDCDCD",

    green: "#39C01E",
    lightGreen: "#C3FFA8",
    black: "#000000",
    white: "#FFFFFF",

    tabPrimary: "#023047",
    tabSecondary: "#219EBC",

}

const baseWidth = width / 100;
const baseHeight = height / 100;


export const SIZES = {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,

    small: 12,
    medium: 16,
    large: 20,
    xLarge: 32,
    xxLarge: 40,

    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    height,
    width,

    baseWidth,
    baseHeight,
}


