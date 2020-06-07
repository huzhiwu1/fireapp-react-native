
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator ,Button} from 'react-native';
import Popup from './Popup';
import {Toast} from 'teaset'
import Address from './Address';
class AddressSelect extends Component {
    constructor(props) {
        super(props);
    }
    open() {
        var address = [];
        Popup.show({
            title: "请选择地址",
            popupHeight:300,
            content: (
                <Address length={3} activeColor="#1e88e5" change={(res) => {
                    address = res;
                }}></Address>
            )
        }, (res) => {
                console.log(address);
                if (address.length < 3 ) {
                    Toast.message("请选择地址");
                } else {
                    Popup.hide();
                }
        });
    }
    render() {
        return (
            <ScrollView style={styles.pageStyle}>
                <Popup/>
                <Text style={{ fontSize: 30 }}>addressSelect</Text>
                <Button title="打开弹窗" onPress={this.open.bind(this)} />
            </ScrollView>
        );
    }
}
export default AddressSelect;
const styles = StyleSheet.create({
    pageStyle: {
        backgroundColor: '#f5f5f5',
    },
});
