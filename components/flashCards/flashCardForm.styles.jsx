/**
 * File: FlashCardForm.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 9.12.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'
const styles = StyleSheet.create({

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


});

export default styles;