import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../constants/theme'

const styles = StyleSheet.create({
    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.h2,
    },

    topBarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 33,
    },

    tileWrapper: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 33,
        paddingTop: 10,
    },

    tileNavigator: {
        padding: 10,
        width: 154,
        height: 189,
        borderRadius: 20,
        marginRight: 25,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    savedCollectionsWrapper: {
        justifyContent: 'start',
        alignItems: 'start',
        padding: 33,
        maxHeight: 10000,
        paddingTop: 10,

    }
})

export default styles;