import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import Icons from "react-native-vector-icons/Feather"
export default class Weather extends Component {
    static defaultProps = {
        temperature: '33',
        weather: '晴',
        city: '汕头市',
        airQuality: '良',
        PM: '80',
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { temperature, weather, city, PM, airQuality } = this.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.weatherTop}>
                    <View style={styles.weatherWrap}>
                        <Text style={styles.temperature}>{temperature}<Text style={styles.temperauterIcon}>℃</Text></Text>
                        <Text style={styles.weather}>{weather}</Text>
                    </View>

                    <View style={styles.btnBox}>
                        <Icons
                            name='mail'
                            size={26}
                            style={{ color: "#fff" }}
                        />
                    </View>
                </View>
                <View style={styles.weatherBottom}>
                    <Text style={styles.title}>{city}</Text>
                    <Text style={styles.title}>空气质量 : {airQuality}</Text>
                    <Text style={styles.title}>PM2.5 : {PM}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    weatherTop: {
        width:'100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row'
    },
    weatherWrap:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: "baseline",
        flexDirection: 'row'
    },
    weather: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 25
    },
    temperature: {
        color: '#fff',
        fontSize: 50,
    },
    temperauterIcon: {
        fontSize: 25
    },
    weatherBottom: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',

    },
    title: {
        color: '#fff',
        fontSize: 15,
        marginRight: 20
    }
}) 