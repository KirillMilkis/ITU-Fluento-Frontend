/**
 * File: FlashCardListScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 5.11.2024
 * 
 */

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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "7%",
        width: SIZES.width - 48,
        paddingHorizonral: 0,
        zIndex: 999,
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
    },

    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'fit-content',
    },

    saveButton: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 10,
        width: '50%',
        margin: 10,
    },

    saveButtonText: {
        textAlign: 'center',
        color: COLORS.white,
        fontSize: SIZES.h3,
    },

    textInput: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
    },
    
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'auto',
        alignItems: 'center',
        textAlign: 'center',
    },

    tooltip: {
        position: 'absolute',
        top: -13,
        textAlign: 'center',
    },

    topBarMenuWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        gap: 10,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    popUpContainer: {
        marginTop: 100, 
        marginRight: 10, 
        backgroundColor: 'white',
        borderRadius: 8,
        width: SIZES.baseWidth * 40,
        padding: 10,
        elevation: 5, 
    },
    popUpText: {
        fontSize: 16,
        color: 'black',
        marginVertical: 5,
    },

    topBarElem: {
        width: '33%',
    }
});




export default styles;