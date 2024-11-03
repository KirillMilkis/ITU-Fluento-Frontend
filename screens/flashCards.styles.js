import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../constants/theme'

const styles = StyleSheet.create({

    topBarContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        zIndex: 999,
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
    },

    flashCardContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
    },
});



export default styles;