import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class RefreshableList extends Component {
  static defaultProps = {
    renderContainer() {
      return (
        <View style={styles.wrapper}>
          <Text>没有展示内容</Text>
        </View>
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  _onRefresh = () => {
    this.props.getInfo();
    this.setState = {
      refreshing: true,
    };
  };
  render() {
    const { refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#1e88e5']}
            title={'下拉刷新'}
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.props.renderContainer()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
