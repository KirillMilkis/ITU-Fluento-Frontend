import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    topBarContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width - 48,
        // width: '100%',
        paddingHorizonral: 0,
        zIndex: 999,
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.xLarge,
        fontFamily: "light",
        marginHorizontal: 10,
    },

    flashCardContainer: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',

        height: '100%',
        marginVertical: SIZES.baseHeight * 16,
    },

    flashCard: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: SIZES.width - 150,
        height: SIZES.height - 550,
        backfaceVisibility: 'hidden',
        position: 'absolute',
        marginHorizontal: -140,
    },

    frontCard: {
        backgroundColor: COLORS.gray1,
    },

    backCard: {
        backgroundColor: COLORS.gray2,
    },



    spacingTitles: {
        marginVertical: 5, // Adds vertical space between text elements
    },
    spacing: {
        marginVertical: 7, // Adds horizontal space between text and icon
    },

   
});



export default styles;