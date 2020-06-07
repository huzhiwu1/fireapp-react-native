import React, { Component } from 'react';
import cityList from '../utils/City'
import autoSize from '../utils/autoSize'
import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableHighlight } from 'react-native';
const { width, height } = Dimensions.get('window');
var scrollViewRef;
class Address extends Component {
    static defaultProps = {
        value: [],//默认数据
        length: 3,//地址选择的长度，从省开始
        activeColor: "#1e88e5" //选中的颜色
    };
    constructor(props) {
        super(props);
        this.state = {
            //选出的值,城市名字
            addressVal: [],
            //当前选择
            addressIndex: 0,
            //列表的值
            addressList: [],
            // 市级列表
            cityList: [],
            // 区级列表
            areaList: []
        };
        this.SelectListAddress = this.SelectListAddress.bind(this);
        this.getRegion = this.getRegion.bind(this);
        this.selectType = this.selectType.bind(this);
    }
    //加载完成的生命钩子
    componentDidMount() {
        this.setState({
            addressVal: this.props.value
        });
        this.getRegion(0);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    //获取地址信息
    getRegion(type, uid) {
        if (type == 0) {
            this.setState({
                addressList: cityList
            })
        } else if (type == 1) {
            if (this.state.cityList) {
                this.setState({
                    addressList: this.state.cityList
                })
            } else {
                let newAddressList = null;
                this.state.addressList.forEach(item => {
                    if (item.value === uid) {
                        newAddressList = item.children
                    }
                })
                this.setState({
                    addressList: newAddressList,
                    cityList: newAddressList
                })
            }
        } else if (type == 2){
            if (this.state.areaList){
                this.setState({
                    addressList: this.state.areaList
                })
            }else {
                let newAddressList = null;
                this.state.addressList.forEach(item => {
                    if (item.value === uid) {
                        newAddressList = item.children
                    }
                })
                this.setState({
                    addressList: newAddressList,
                    areaList: newAddressList
                })
            }
        }else{
            this.setState({
                addressList:[]
            })
        }
        scrollViewRef.scrollTo({ x: 0, y: 0, animated: true })
    }
    


    // const _this = this;
    // $http.get('kemean/aid/region', { pid: uid })
    //     .then(function (response) {
    //         if (response.length > 0) {
    //             _this.setState({
    //                 addressList: response
    //             });
    //             setTimeout(() => {
    //                 scrollViewRef.scrollTo({ x: 0, y: 0, animated: true });
    //             }, 50);

    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
// }
//选择地址列表
SelectListAddress(item){
    var addressVal = this.state.addressVal;
    let len = this.state.addressVal.length;
    if (len == 0) {
        this.setState({
            cityList: item.children
        })
    } else if (len == 1) {
        this.setState({
            areaList: item.children
        })
    }
    this.setState((preState) => {
        return {
            addressVal: [...preState.addressVal, item],
        }
    },()=>{
        this.getRegion(this.state.addressVal.length,item.value)
        this.props.change && this.props.change(this.state.addressVal);
    })
    
    // var addressIndex = this.state.addressIndex;
    // if (this.state.addressIndex === 0) {
    //     addressVal = [];
    // } else {
    //     addressVal.splice(this.state.addressIndex, addressVal.length - 1);
    // }
    // addressVal.push(item);
    // if (addressVal.length < this.props.length) {
    //     this.getRegion(item.objId);
    //     addressIndex++;
    // }
    // this.setState({
    //     addressVal: addressVal,
    //     addressIndex: addressIndex
    // });
    
}
//选择地址类型
selectType(index) {
    var addressVal = this.state.addressVal;
    var len = addressVal.length;
    if (index == 0) {
        this.getRegion(0);
    } else {
        this.getRegion(index,addressVal[index - 1].value);
    }
    this.setState(prevState => ({
        addressVal: prevState.addressVal.slice(0,index)
    }));
}
render() {
    //选择的值
    var addressVal = this.state.addressVal.map((item, index) => (
        <TouchableHighlight key={index} underlayColor="#f1f1f1" onPress={() => {
            this.selectType(index);
        }}>
            <Text style={{
                marginLeft: 0,
                ...styles.AddressItem,
                color: (this.state.addressVal.length-1) === index ? this.props.activeColor : "#333"
            }}>{item.label}</Text>
        </TouchableHighlight>
    ));
    //请选择操作
    var pleaseChoose = () => {
        var len = this.state.addressVal.length;
        if (len < this.props.length) {
            return (<TouchableHighlight underlayColor="#f1f1f1" onPress={() => {
                // this.selectType(len);
                // this.getRegion(len)
            }}>
                <Text style={{
                    marginLeft: 0,
                    ...styles.AddressItem,
                    color: this.state.addressIndex === len ? this.props.activeColor : "#333"
                }}>请选择</Text>
            </TouchableHighlight>)
        } else {
            return undefined;
        }
    }
    return (
        <View style={styles.AddressPage}>
            <View style={{
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: "#eee",
                borderBottomWidth: 1,
                flexDirection: "row",
                height: 40
            }}>
                {addressVal}
                {pleaseChoose()}
            </View>
            <View style={{ height: autoSize(235) }}>
                <ScrollView ref={scrollView => {
                    if (scrollView !== null) {
                        scrollViewRef = scrollView;
                    }
                }}>
                   {
                        this.state.addressList.length>0?this.state.addressList.map((item, index) => {
                            return <TouchableHighlight key={index} underlayColor="#f1f1f1" onPress={() => {
                                this.SelectListAddress(item);
                            }}>
                                <Text style={{
                                    ...styles.SelectItem,
                                    color: "#333"
                                }}>{item.label}</Text>
                            </TouchableHighlight>

                        }):<Text style={{
                            ...styles.SelectItem,
                            height:autoSize(235),
                            lineHeight:autoSize(235),
                            color:  "#333"
                        }}>没有更多选项</Text>
                    }
                </ScrollView>
            </View>
        </View>
    );
}
}
export default Address;
const styles = StyleSheet.create({
    AddressPage: {
        width: width,
        height: autoSize(300),
    },
    AddressItem: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 40,
        lineHeight: 40,
        fontSize: autoSize(16)
    },
    SelectItem: {
        paddingLeft: 15,
        paddingRight: 15,
        height: 40,
        lineHeight: 40,
        fontSize:autoSize(15)
    }
});
