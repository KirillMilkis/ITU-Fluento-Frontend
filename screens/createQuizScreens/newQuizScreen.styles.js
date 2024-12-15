/*
 * File: newQuizScreen.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: '30%',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        marginLeft: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    headerIconWrapper: {
        width: 40,
        alignItems: 'flex-end',
    },
    deleteSelectedButton: {
        padding: 2,
        backgroundColor: 'red',
        borderRadius: 20,
    },
    label: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: '20%',
        marginBottom: 16,
    },
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
    questionList: {
        marginBottom: 16,
    },
    questionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e6e6e6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        marginHorizontal: 20,
    },
    questionText: {
        fontSize: 16,
        flex: 1,
    },
    questionActions: {
        flexDirection: 'row',
        gap: 16,
    },
    selectionCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selectedCircle: {
        backgroundColor: 'blue',
    },
    unselectedCircle: {
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    selectedQuestionItem: {
        backgroundColor: '#d1e7fd',
    },
    addQuestionButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 45,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    addQuestionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#d3d3d3',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    saveText: {
        color: 'black',
        fontSize: 18,
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
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    spacing: {
        marginRight: 8,
    },
});

export default styles;
