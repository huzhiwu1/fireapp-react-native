import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

import Html from './indexHtml';
export default class Map extends Component {
  onMessage = event => {
    let data = JSON.parse(event.nativeEvent.data);
    // console.log(data);
    this.props.getLocation(data);
  };
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: Html }}
        onMessage={this.onMessage}
      />
    );
  }
}
