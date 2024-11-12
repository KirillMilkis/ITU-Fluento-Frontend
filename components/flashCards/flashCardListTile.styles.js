import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    flashCard: {
        width: 170,
        height: 242,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flashCardTop: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: '20',
        borderTopRightRadius: '20',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        backgroundColor: COLORS.gray1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flashCardBottom: {
        height: '50%',
        width: '100%',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '20',
        borderBottomRightRadius: '20',
        backgroundColor: COLORS.gray2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flashCardText: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: "Bold",
    },

    
});

export default styles;