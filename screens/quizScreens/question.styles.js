import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    topBarContainer:{
        flex: 0,
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

    container:{
        flex: 1,
    },
    bottomBarContainer:{
        flex:0,
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
    bottomBarIcon:{
        color: "white",
        fontSize: 35,
        padding:18,
        paddingLeft:30,
        paddingRight:30,
    },

    nextQButton: {
        padding: 16,
        backgroundColor: "#007bff",
        borderRadius: 4,
        alignItems: "center",
        marginTop: 16,
    },

})

export default styles;