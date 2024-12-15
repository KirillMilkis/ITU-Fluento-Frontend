/*
 * File: avatarChangeScreen.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */

import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    spacing: {
        margin: 10,
    },

    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },

    imageContainer: {
        position: 'relative',
        width: 100,
        height: 100,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    selectedImage: {
        borderWidth: 0,
        borderColor: 'green',
    },

    greenFilter: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4, 
        bottom: -4,
        borderRadius: 54,
        backgroundColor: '#79FF6CAA',
        zIndex: 1,
    },

    selectedIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        padding: 5,
        zIndex: 2,
    },

    genderToggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

    genderButton: {
        padding: 10,
        backgroundColor: '#EAEAEA',
        borderRadius: 50,
    },

    selectedGenderButton: {
        backgroundColor: '#32ADE6',
    },

    genderButtonText: {
        fontSize: 20,
        color: 'black',
    },

    saveButton: {
        width: '50%',
        backgroundColor: COLORS.green,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    saveButtonText: {
        color: 'white',
        fontSize: 18,
    },

    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    topBarText: {
        flex: 1,
        textAlign: 'center',
    },

    saveButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

});

export default styles;