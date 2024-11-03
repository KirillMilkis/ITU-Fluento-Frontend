import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../constants/theme'

const styles = StyleSheet.create({
    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.h1 - 3,
        textAlign: 'left',
        paddingHorizontal: 0,
    },

    textStyle3: {
        color: COLORS.black,
        fontSize: SIZES.h2,
    },

    topBarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 33,
    },

    tileNavContainer: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 33,
        paddingTop: 10,
    },

    tileNavigator: {
        padding: 10,
        width: SIZES.baseWidth * 35,
        height: SIZES.baseHeight * 21,
        borderRadius: 20,
        marginRight: 25,
        backgroundColor: COLORS.secondary,
        justifyContent: 'start',
        alignItems: 'start',
    },

    savedCollectionsContainer: {
        justifyContent: 'center',
        alignItems: 'start',
        padding: 33,
        maxHeight: 10000,
        paddingTop: 10,

    },
    spacing: {
    marginVertical: 7, // Adds vertical space between text elements
    },
})

export default styles;