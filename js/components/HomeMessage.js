import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
export default class homeMessage extends Component{
    static defaultProps = {
        message:'未检测到设备发生异常！'
    }
    constructor(props){
        super(props)
    }
    render(){
        const {message} = this.props
        return(
            <View style={styles.wrapper}>
                <Text style={styles.title}>{message}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        padding:10,
        paddingLeft:20,

    },
    title:{
        color:'#fff',
        fontSize:13
    }
})