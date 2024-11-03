import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    tileWrapper: {
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 0,
        paddingTop: 10,
    },


    tileForm: {
        padding: 15,
        width: 370,

        flexDirection: 'row',
        height: 91,
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: '',

        alignItems: 'center',
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.small,
    },

    textWrapperColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 2,
    },

    TextWrapperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },



});

export default styles;