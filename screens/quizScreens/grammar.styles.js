/*
File: grammar.styles.js
Author: Petra Oravová <xoravo01>
Date Created: 11.11.2024
Note: */
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
        fontSize: SIZES.body2-3,
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
        backgroundColor: COLORS.tabPrimary,
    },
    bottomBarIcon:{
        color: "white",
        fontSize: 35,
        padding:18,
        paddingLeft:30,
        paddingRight:30,
    },

    image: {
        margin:50,
        width: 200,
        height: 200,
        marginBottom: 30,
        alignSelf: "center",
    },

})

export default styles;