import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({

    container: {
        gap: 16,        
        flexDirection: 'column',
        spaceBetween: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        maxHeight: 10000,
        paddingTop: 10,

    },

    spacingTitles: {
        marginVertical: 5, // Adds vertical space between text elements
    },
    spacing: {
        marginVertical: 7, // Adds horizontal space between text and icon
    },
})

export default styles;