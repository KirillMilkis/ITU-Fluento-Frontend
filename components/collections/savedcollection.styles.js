import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    tileWrapper: {
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'fit-content',
        padding: 0,
        paddingTop: 10,
    },

    tileForm: {
        padding: 15,
        width: SIZES.baseWidth * 85, // Set width to 100%
        flexDirection: 'row',
        height: 'auto',
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        marginHorizontal: 10,
    },

    textWrapperColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 2,
    },
    likesWrapperColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },

    TextWrapperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
});

export default styles;