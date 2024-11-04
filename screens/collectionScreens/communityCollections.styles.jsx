import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    
    topBarContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // gap: '100%',
        alignItems: 'center',
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

    collectionsListContainer: {
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

    spacingTitles: {
        marginVertical: 5, // Adds vertical space between text elements
    },
    spacing: {
        marginVertical: 7, // Adds horizontal space between text and icon
    },
})

export default styles;