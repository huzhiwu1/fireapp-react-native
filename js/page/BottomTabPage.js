import React,{Component} from "react"
import NavigationUtil from "../navigator/NavigationUtil"
import MainTabNavigator from "../navigator/MainTabNavigator"
import {
    View,
    StyleSheet
} from "react-native"
export default class BottomTabPage extends Component{
    render(){
        NavigationUtil.navigation = this.props.navigation
        return(
            <View style={styles.wrapper}>
                <MainTabNavigator/>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        display:'flex',
        flex:1
    }
})