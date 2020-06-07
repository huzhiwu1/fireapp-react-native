import React,{Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native"
import SchoolDevicePage from "../page/SchoolDevicePage"
import HomeDevicePage from "../page/HomeDevicePage"
import {createAppContainer} from "react-navigation"
import {createMaterialTopTabNavigator} from "react-navigation-tabs"

export default class HomePage extends Component {
    _topTabBar(){
        if(!this.topTabBar){
            this.topTabBar = createAppContainer(createMaterialTopTabNavigator({
                tab1:{
                    screen:HomeDevicePage,
                    navigationOptions:{
                        title:"家庭"
                    }
                },
                tab2:{
                    screen:SchoolDevicePage,
                    navigationOptions:{
                        title:"学校"
                    }
                }
            },{
                tabBarOptions: {
                    tabStyle: styles.tabStyle,//选项卡等样式对象,
                    upperCaseLabel: false,//是否使标签大写，默认为true
                    scrollEnabled: true,//是否支持 选项卡滚动，默认false
                    style: {// 选项卡栏等样式对象
                        backgroundColor: "#fff",//TabBar 的背景颜色
                        height: 50,//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                        // borderRadius:5,
                        // width:"100%",
                       
                    },
                    indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                    labelStyle: styles.labelStyle,//文字的样式
                },
                lazy: true
            }))
        }
        return this.topTabBar
    }
    render(){
        const  TopTabBar = this._topTabBar() 
        return (
            <View style={styles.wrapper}>
                <TopTabBar/>
                {/* <Text style={styles.item}>首页</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=>{
                        NavigationUtil.goPage({},"DeviceGroupManager")
                    }}
                >
                    <Text style={styles.btnText}>跳转场景管理</Text>
                </TouchableHighlight> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop:30,
        // width:"100%",
        // height:"100%",
        // backgroundColor:"#34b5ff",
        // display:"flex",
        flex:1,
        // justifyContent:"center",
        // alignItems:"center"
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
    },
    tabStyle:{
        // borderRadius:5,
        // width:"auto",
        // height:48,
        // // marginLeft:5,
        // // marginRight:5,
        // backgroundColor:"#34b5ff",
        padding:0,
        // borderStyle:"solid",
        // borderWidth:1,
        // borderColor:"#000",
    },
    indicatorStyle:{
        backgroundColor:"red",
        height:2
    },
    labelStyle:{
        width:"100%",
        // borderStyle:"solid",
        // borderWidth:1,
        // borderColor:"#000",
        margin:0,
        fontSize:20,
        color:"#34b5ff"
    }
})