import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    flashCard: {
        width: 200,
        height: 250,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flex: 1/2,
        padding: 10,
    },

    flashCardTop: {
        width: '100%',
        height: '50%',
        padding: 10,
        borderTopLeftRadius: '20',
        borderTopRightRadius: '20',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        backgroundColor: COLORS.gray1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },


    flashCardBottom: {
        height: '50%',
        width: '100%',
        padding: 10,
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '20',
        borderBottomRightRadius: '20',
        backgroundColor: COLORS.gray2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    flashCardText: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: "Bold",
    },

    
});

export default styles;