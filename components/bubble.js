import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import SearchBar from 'react-native-search-bar'
import axios from 'axios';
import Card from './../components/card';

export default class App extends Component{

    state = {
        search:"search here!!"
    }


    render(){
        return(
            <View style={styles.bubble}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
};

const styles = {
    scroll:{
        // marginTop:10,
        padding:20
    },
    text:{
        color:"white"
    },
    bubble:{
        backgroundColor:"#FF6347",
        borderRadius:20,
        padding:10,
        // width:"auto"
        alignSelf:"flex-start",
        margin:5
    }
}