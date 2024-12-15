/*
 * File: question.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    inputContainer: {
        width: '30%',
        marginBottom: 20,
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5,
        fontSize: 16,
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionButton: {
        width: '30%',
        height: 60,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        padding: 5,
        position: 'relative',
        backgroundColor: '#E0E0E0',
    },
    selectedOption: {
        backgroundColor: '#4caf50',
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    orderText: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 45,
        zIndex: 5,
        backgroundColor: '#3c9f40',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,

        // // Shadow for Android
        // elevation: 5,

        // // Shadow for iOS
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
    },
    text: {
        fontSize: 22,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

    optionsContainerTF: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

    optionButtonTF: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    selectedOptionTF: {
        backgroundColor: '#d1f7d6',
        borderColor: '#76c893',
    },
    falseSelectedOptionTF: {
        backgroundColor: '#f7d6d6',
        borderColor: '#c87676',
    },
});

export default styles;