/**
 * File: CollectionListScreen.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 5.11.2024
 * 
 */

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    
    topBarContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width - 48,
        paddingHorizonral: 0,
        height: SIZES.baseHeight * 5,
        zIndex: 999,
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h2,
        fontFamily: "Bold",
        overflow: 'hidden', 
    },

    collectionsListContainer: {
        gap: 16,        
        flexDirection: 'column',
        spaceBetween: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'start',
        padding: 33,
        maxHeight: 10000,
        paddingTop: 10,

    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    tooltip: {
        position: 'absolute',
        textAlign: 'center',
        bottom: -15,
        width: '130%',
        left: -22,

    },
    
    spacingTitles: {
        marginVertical: 5, 
    },
    spacing: {
        marginVertical: 7,
    },
})

export default styles;