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

    textStyle:{
        paddingHorizontal: SIZES.padding,
        fontSize: SIZES.font,
    },

    titleStyle:{
        padding: SIZES.padding,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
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
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: COLORS.tabPrimary,
    },
    bottomBarIcon:{
        color: "white",
        fontSize: 30,
    },

    image: {
        width: 120,
        height: 120,
        marginBottom: 30,
        alignSelf: "center",
    },

})

export default styles;