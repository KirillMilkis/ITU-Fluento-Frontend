/**
 * File: CollectionsMainScreen.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
        overflow: 'hidden', 
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.h1 - 3,
        textAlign: 'left',
        overflow: 'hidden', 
    },

    textStyle3: {
        color: COLORS.black,
        fontSize: SIZES.h2 + 4,
        paddingBottom: 10,
        paddingLeft: 33,
        overflow: 'hidden', 
    },

    topBarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 33,
        paddingBottom: 25,
    },

    tileNavList: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 33,
        paddingTop: 10,
    },

    tileNavigator: {
        padding: 10,
        width: SIZES.baseWidth * 35,
        height: SIZES.baseHeight * 21,
        borderRadius: 20,
        marginRight: 25,
        backgroundColor: COLORS.secondary,
        justifyContent: 'start',
        alignItems: 'start',
    },

    wrapperOuter: {
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
    },

    savedCollectionsList: {
        gap: 6,        
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: SIZES.baseHeight * 9, 
        alignItems: 'start',
        paddingTop: 10,

    },

    yourCollectionsTile: {
        marginLeft: 33,
        padding: 15,
        width: SIZES.baseWidth * 85,
        flexDirection: 'row',
        height: SIZES.baseHeight * 10,
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    spacingTitles: {
        marginVertical: 9,
    },
    spacing: {
        marginVertical: 7,
    },
})

export default styles;