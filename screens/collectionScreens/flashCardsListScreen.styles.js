import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

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

});



export default styles;