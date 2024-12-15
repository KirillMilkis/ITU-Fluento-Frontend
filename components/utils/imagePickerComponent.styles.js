/*
 * File: imagePickerComponent.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        marginBottom: 16,
        alignSelf: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    removeImage: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 2,
    },
    imageUploadButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
});

export default styles;
