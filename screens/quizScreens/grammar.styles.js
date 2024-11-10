import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    topBarContainer:{
        paddingHorizontal:SIZES.padding,
        paddingVertical:SIZES.small,
        backgroundColor:COLORS.primary,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    topBarText:{
        paddingTop:SIZES.xxLarge+4,
        fontSize: SIZES.h1-2,
    },

    topBarIcon:{
        paddingTop:SIZES.xxLarge+4,
        fontSize: SIZES.xxLarge,
    },

    textStyle:{
        paddingHorizontal: SIZES.padding,
        fontSize: SIZES.font,
    },

    titleStyle:{
        padding: SIZES.padding,
        fontSize:SIZES.h1,
        fontWeight:'bold',
    }


})

export default styles;