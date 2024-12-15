/**
 * File: CollectionList.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 5.11.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    container: {
        gap: 16,        
        flexDirection: 'column',
        spaceBetween: 50,
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        paddingBottom: SIZES.baseHeight * 12, 
        alignItems: 'center',
        padding: 33,
        paddingTop: 10,
        height: 'fit-content', 
        
    },

    spacingTitles: {
        marginVertical: 5, 
    },
    spacing: {
        marginVertical: 7,
    },

})

export default styles;