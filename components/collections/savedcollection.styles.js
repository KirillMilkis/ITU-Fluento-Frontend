import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    tileWrapper: {
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 33,
        paddingTop: 10,
    },

    tileForm: {
        padding: 15,
        width: 370,

        flexDirection: 'row',
        height: 91,
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

});

export default styles;