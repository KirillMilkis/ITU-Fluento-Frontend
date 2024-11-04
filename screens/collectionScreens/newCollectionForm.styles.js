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

    titleStyle2: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: "Semibold",
    },

    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: 33,
        gap: 14,
    },

    inputStyle: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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


    spacing: {
        marginVertical: 50, // Adds horizontal space between text and icon
    },
    titleSpacing: {
        marginVertical: 14, // Adds horizontal space between text and icon
    }


});



export default styles;