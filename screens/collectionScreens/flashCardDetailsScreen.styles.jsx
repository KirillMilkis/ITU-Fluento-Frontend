/**
 * File: flashCardDetailsScreen.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 4.11.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    topBarContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width - 48,
        paddingHorizonral: 0,
        zIndex: 999,
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
    },

    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.xLarge,
        fontFamily: "light",
        marginHorizontal: 10,
        overflow: 'scroll',
    },

    flashCardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',

        height: SIZES.baseHeight * 27,
        marginVertical: SIZES.baseHeight * 16,
    },

    flashCard: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: SIZES.width - 150,
        height: SIZES.height - 550,
        backfaceVisibility: 'hidden',
        position: 'absolute',
        marginHorizontal: -140,
        overflow: 'scroll',
    },

    frontCard: {
        backgroundColor: COLORS.gray1,
    },

    backCard: {
        backgroundColor: COLORS.gray2,
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },


    scoreOptionsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 0,
        alignItems: 'center',
        width: SIZES.baseWidth * 100,
        height: SIZES.baseHeight * 25,
        padding: 20,
    },
    
    scoreOptionsTitleText: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
        marginBottom: 0,
    },
    
    scoreOptionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: SIZES.baseWidth * 5,
        alignItems: 'center',
        width: '90%',
        height: 150,
    },
    
    singleScoreOptionWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: COLORS.gray1,
        borderColor: COLORS.primary,
        borderWidth: 1,
        // marginHorizontal: 10,
        elevation: 3,
    },
    
    scoreOptionText: {
        fontSize: SIZES.h3,
        color: COLORS.black,
        fontFamily: "Bold",
    },
    
    selectedOption: {
        backgroundColor: COLORS.primary,
        position: 'relative',
        marginHorizontal: 0,
        width: 80,
        height: 80,
    },

    cardNavButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        justifySelf: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 40, 
        gap: 40,
      },

    cardNavButton: {
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.primary, 
    borderRadius: 10, 
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    },
    
    cardNavButtonText: {
    color: '#fff', 
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    },

    mainContainer: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    height: '100%',
    },


    spacingTitles: {
        marginVertical: 5, 
    },
    spacing: {
        marginVertical: 7, 
    },

   
});



export default styles;