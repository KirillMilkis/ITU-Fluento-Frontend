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

    titleStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",


    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h3,
        fontFamily: "Bold",
    },

    spacing: {
        marginVertical: 50,
    },
    spacing2: {
        marginVertical: 7, 
    },
    titleSpacing: {
        marginVertical: 14, 
    }

});



export default styles;