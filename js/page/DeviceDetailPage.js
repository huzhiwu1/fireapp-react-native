import React,{Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from "react-native"
import NavigationUtil from "../navigator/NavigationUtil"

export default class DeviceDetailPage extends Component {
    render(){
        return (
            <View style={styles.wrapper}>
                <Text style={styles.item}>设备详情页</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=>{
                        NavigationUtil.goPage({},"Permission")
                    }}
                >
                    <Text style={styles.btnText}>跳转权限页</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=>{
                        NavigationUtil.goPage({},"MoreBaseInfo")
                    }}
                >
                    <Text style={styles.btnText}>跳转更多信息</Text>
                </TouchableHighlight>
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
    },
    button:{
        marginBottom:10,
        backgroundColor:"#fff",
        marginTop:10,
    },
    btnText:{
        color:"#34b5ff",
        fontSize:30
    }
})