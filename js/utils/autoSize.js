import {Dimensions} from "react-native";
let screenWidth = Dimensions.get('window').width
const designWidth = 375;
export default autoSize = (num)=>{
    return num*(screenWidth/designWidth)
}
