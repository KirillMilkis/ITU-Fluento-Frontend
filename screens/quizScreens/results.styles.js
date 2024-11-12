import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    topBarContainer:{
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.small,
        backgroundColor: COLORS.tertiary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    topBarText:{
        paddingTop: SIZES.xxLarge+4,
        width: "85%",
        fontSize: SIZES.h1-5,
    },

    topBarIcon:{
        paddingTop: SIZES.xxLarge+4,
        fontSize: SIZES.xxLarge,
    },

    mainScore:{
        fontSize: SIZES.xxLarge*2,
        alignSelf: "center",
        paddingTop: 50,
    },

    secScore:{
        fontSize: SIZES.xxLarge,
        alignSelf: "center",
        paddingBottom: 50,
    },

    message:{
        alignSelf: "center",
        fontSize: SIZES.h2+6,
        paddingBottom: 50,
        paddingHorizontal: 15,
    },

    secText:{
        alignSelf: "center",
        fontSize: SIZES.h2+6,
    },

    container:{
        flex: 1,
    },

    bottomBarContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.tabPrimary,
    },

    bottomBarText:{
        color: "white",
        fontSize: 20,
    }
})

export default styles;