/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Pharm from "./container/pharm"
import Diag from "./container/testcenter"
import Home from "./container/home"

// import BleManager from 'react-native-ble-manager';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'


const AppSwitchNavigator = createSwitchNavigator({
    Home: {screen: Home},
    Pharm: {screen: Pharm },
    Diag : {screen: Diag},
});

const AppContainer = createAppContainer(AppSwitchNavigator)

class App extends Component{


  render(){
    return(
      <AppContainer />
    )
  }
}



export default App;



