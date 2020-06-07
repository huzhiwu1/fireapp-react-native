import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native'
const { width } = Dimensions.get('window')
export default class RecentlyStatusCard extends Component {
    static defaultProps = {
        statusArr: [
            {
                name: '当天预警',
                num: 0,
            },
            {
                name: '近7天预警',
                num: 7
            },
            {
                name: '近30天预警',
                num: 30
            }
        ]
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { statusArr } = this.props
        return (
            <View style={styles.wrapper}>
                {
                    statusArr.map((item, index) => {
                        return (<View style={styles.item}>
                            <View style={styles.infoBox}>
                                <View style={styles.info}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <View style={styles.numBox}>
                                        <Text style={styles.num}>{item.num}</Text>
                                        <Text style={styles.count}>次</Text>
                                    </View>
                                </View>

                            </View>

                            {
                                index != 2 && <View style={styles.divider} />
                            }
                        </View>)
                    })
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        width: (width - 40),
        backgroundColor: '#fff',
        height:130,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    item: {
        width: (width - 40) / 3,
        height: 130,
        // padding: 20,
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoBox: {
        width: '100%',
        // margin:'auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    info:{
        height:'100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignContent: 'flex-start',

    },
    divider: {
        height: '100%',
        width: 1,
        backgroundColor: '#707070'
    },
    title: {
        fontSize:14,
    },
    numBox:{
        
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    num:{
        fontSize:26,
    },
    count:{
        marginLeft:5,
        fontSize:9,
        color:'rgba(0,0,0,0.5)'
    }
})