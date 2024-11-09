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

    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: 33,
        gap: 14,


    },

    flashCardContainer: {
        width: SIZES.width - 150,
        height: SIZES.height - 550,
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

    inputStyle: {
        width: '95%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        elevation: 3,
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

    submitButton: {
        backgroundColor: COLORS.green,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },


    frontCard: {
        backgroundColor: COLORS.gray1,
    },

    backCard: {
        backgroundColor: COLORS.gray2,
    },

    spacing: {
        marginVertical: 50, // Adds horizontal space between text and icon
    },
    spacing2: {
        marginVertical: 7, // Adds horizontal space between text and icon
    },
    titleSpacing: {
        marginVertical: 14, // Adds horizontal space between text and icon
    }


});



export default styles;