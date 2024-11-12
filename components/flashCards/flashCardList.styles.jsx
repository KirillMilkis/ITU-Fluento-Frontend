import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/theme'
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    
container: {

    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    
    

    gap: 14,

},

listContainer: {
    width: SIZES.width,
    
},

});

export default styles;