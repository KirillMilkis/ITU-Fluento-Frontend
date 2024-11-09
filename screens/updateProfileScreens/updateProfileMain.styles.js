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
});

export default styles;
