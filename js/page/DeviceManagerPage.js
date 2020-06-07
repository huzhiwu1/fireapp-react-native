import React,{Component} from "react"
import {
    View,
    Text,
    StyleSheet
} from "react-native"

export default class DeviceManagerPage extends Component {
    render(){
        return (
            <View style={styles.wrapper}>
                <Text style={styles.item}>设备管理</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:"#34b5ff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    item:{
        fontSize:30,
        color:"#fff"
    }
})