/*
 * File: question.styles.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note:
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        height: 80,
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center',
    },
    textInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontSize: 16,
        padding: 10,
        color: '#000',
        zIndex: 2,
    },
    line: {
        position: 'absolute',
        left: 10,
        right: 10,
        height: 1,
        backgroundColor: '#000',
        zIndex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
});

export default styles;