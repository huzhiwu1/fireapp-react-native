/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { RootNavigator } from './js/navigator/AppNavigators';
import store from './js/store';
import { Provider } from 'react-redux';
import initApp from './js/initApp';
import { TopView, Theme } from 'teaset';

import { StatusBar, SafeAreaView } from 'react-native';
initApp();
const App: () => React$Node = () => {
	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<TopView>
					{/* <StatusBar
            // translucent={true}
            // hidden={true}
            barStyle={'light-content'}
          /> */}
					<RootNavigator />
				</TopView>
			</SafeAreaView>
		</Provider>
	);
};
// class App extends Component {
//   componentWillMount(){
//     initApp()
//   }
//   render(){
//     return (
//           <Provider store={store}>
//             <RootNavigator/>
//           </Provider>

//         );
//   }
// }
export default App;
