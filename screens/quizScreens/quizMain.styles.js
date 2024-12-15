/*
 * File: quizMain.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        marginTop: 30,
        marginRight: 20,
    },

    courseLevelStyle: {
        fontWeight: 'bold',
        fontSize: SIZES.h1,
    },

    greetingStyle: {
        alignItems: 'left',
        maxWidth: '60%',
        justifyContent: 'left',
        marginTop: 40,
        marginLeft: 20,
        color: COLORS.black,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },

    languageLevelRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },

    languageLevelButton: {
        backgroundColor: '#FFB703',
        marginRight: 10,
        height: 40,
        paddingVertical: 2,
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    languageLevelButtonText: {
        color: 'white',
        fontSize: SIZES.h3,
    },

    spacingTitles: {
        marginVertical: 5,
    },
    spacing: {
        marginVertical: 7,
    },

    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    quizListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    quizContainerLarge: {
        width: '100%',
        marginBottom: 10,
    },

    quizContainerSmall: {
        width: '48%',
        marginBottom: 10,
    },
});

export default styles;