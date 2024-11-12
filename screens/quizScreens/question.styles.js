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

    question:{
        paddingVertical: 45,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },

    message: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        textAlign: "center",
        fontSize: SIZES.h1-2,
    },

    optionsContainer1: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    optionsContainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
        width: "50%",
    },

    option: {
        width: '95%',
        height: 80,
        backgroundColor: 'gray',
        borderRadius: 12,
        textAlign: "center",
        verticalAlign: "middle",
        padding: 10,
        fontSize: SIZES.h2,
        alignSelf: "center",
        margin: 5,
    },

    trueFalseContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    trueFalseText: {
        fontSize: SIZES.font+2,
        paddingVertical: 10,
        width: "70%"
    },

    trueFalseButton: {
        borderRadius: 12,
        marginVertical: 15,
        paddingVertical: 10,
        width: 93,
        textAlign: "center",
        fontSize: SIZES.h2-2,
    },

    complete:{
        borderRadius: 12,
        width: 130,
        padding: 8,
        textAlign: "center",
        fontSize: SIZES.h2,
        backgroundColor: COLORS.green,
        color: COLORS.white,
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
    bottomBarIcon:{
        color: "white",
        fontSize: 30,
    },

    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
        alignSelf: "center",
    },

})

export default styles;