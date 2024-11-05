import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.h1 - 3,
        textAlign: 'left',
    },

    textStyle3: {
        color: COLORS.black,
        fontSize: SIZES.h2 + 4,
        paddingBottom: 10,
    },

    topBarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 33,
    },

    tileNavList: {
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

    savedCollectionsList: {
        gap: 16,        
        flexDirection: 'column',
        spaceBetween: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'start',
        padding: 33,
        maxHeight: 10000,
        paddingTop: 10,

    },

    yourCollectionsTile: {
        padding: 15,
        width: SIZES.baseWidth * 85, // Set width to 100%
        flexDirection: 'row',
        height: SIZES.baseHeight * 10,
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    spacingTitles: {
        marginVertical: 5, // Adds vertical space between text elements
    },
    spacing: {
        marginVertical: 7, // Adds horizontal space between text and icon
    },
})

export default styles;