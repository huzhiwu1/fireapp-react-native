import React, { Component } from 'react';
import NavigationUtil from '../navigator/NavigationUtil';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      if (this.props.token) {
        // console.log(this.prop.token, 'token');
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 1000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.item}>欢迎页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#34b5ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    fontSize: 30,
    color: '#fff'
  }
});
const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};
export default connect(mapStateToProps)(WelcomePage);
