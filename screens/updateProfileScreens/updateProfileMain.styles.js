/*
 * File: updateProfileMain.styles.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
    profileImage: {
        width: 90,
        height: 90,
        marginRight: 20,
    },

    profileImageSmall: {
        width: 90,
        height: 90,
    },

    profileInfoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },

    imageAndNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    username: {
        fontSize: SIZES.h1 * 1.5,
        fontWeight: 'bold',
        color: COLORS.black,
    },

    usernameSmall: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
    },

    languageLevelText: {
        fontSize: SIZES.h2,
        marginTop: 20,
        color: COLORS.black,
        textAlign: 'left',
    },

    divider: {
        height: 2,
        backgroundColor: COLORS.black,
        marginVertical: 20,
        marginHorizontal: 40,
    },

    createdCollectionsText: {
        fontSize: SIZES.h2,
        textAlign: 'center',
        marginBottom: 10,
    },

    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    spacing: {
        marginVertical: 7,
    },

    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    imageContainer: {
        position: 'relative',
        marginVertical: 20,
    },
    
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
    },

    overlayText: {
        color: COLORS.black,
        fontWeight: 'bold',
    },

    input: {
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
        padding: 10,
        borderRadius: 5,
        width: '70%',
        marginVertical: 10,
    },

    sectionTitle: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: 20,
        textAlign: 'center',
    },

    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '70%',
        marginVertical: 10,
    },

    languageButton: {
        width: '23%',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 20,
        backgroundColor: COLORS.gray2,
        alignItems: 'center',
    },

    selectedLanguageButton: {
        backgroundColor: COLORS.lightGreen,
        borderColor: COLORS.green,
    },

    languageButtonText: {
        color: COLORS.black,
        fontWeight: 'bold'
    },

    slider: {
        width: '70%',
        marginVertical: 10,
    },    

    saveButton: {
        backgroundColor: '#39C01E',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 16,
    },

    saveButtonText: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },

    sliderText: {
        textAlign: 'left', 
        alignItems: 'left',
    },

    popupContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -150 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        zIndex: 1000,
    },

    popupText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
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
      
    topBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    spacing: {
        paddingHorizontal: 8,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'green',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    quizContainerSmall: {
        width: '48%',
        marginBottom: 10,
    },
    
    quizTileContainer: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
        overflow: 'visible',
    },
    
    quizTile: {
        flex: 1,
        zIndex: -1,
        width: '100%',
        backgroundColor: 'white',
    },
    
    editButton: {
        position: 'absolute',
        top: -240,
        right: -10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
    
});

export default styles;
