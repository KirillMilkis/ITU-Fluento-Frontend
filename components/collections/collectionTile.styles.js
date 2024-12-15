/**
 * File: CollectionTile.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    tileContainer: {
        padding: 15,
        width: SIZES.baseWidth * 85, 
        flexDirection: 'row',
        height: SIZES.baseHeight * 10,
        borderRadius: 20,
        backgroundColor: COLORS.gray1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textStyle: {
        color: COLORS.black,
        fontSize: SIZES.h1,
        overflow: 'hidden',
        flexGrow: 2,
    },

    textStyle2: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        marginHorizontal: 10,
        textAlign: 'center',

    },

    textContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        width: '50%',
        paddingHorizontal: 15,
        flexGrow: 2,
    },

    likesContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },

    TextContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
});

export default styles;