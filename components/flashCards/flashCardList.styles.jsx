/**
 * File: FlashCardList.styles.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    
container: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingBottom: SIZES.baseHeight * 12, 
    marginTop: 10,
    flex: 1,
    gap: 5,
},

listContainer: {
    width: SIZES.width,
    
},

scrollContainer: {
    height: "100%",
},

});

export default styles;