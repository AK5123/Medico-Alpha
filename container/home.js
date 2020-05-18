import React, { Component } from 'react';
import logo1 from './../assets/drug.png';
import logo2 from './../assets/lab.png';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import axios from 'axios'

export default class App extends Component{

    handleRoute = (page)=>{
        this.props.navigation.navigate(page);
    }

    render = ()=>{
        return(
            <View style={styles.nitin}>
                <TouchableOpacity 
                    onPress={()=>this.handleRoute('Pharm')}>
                    <View style={[styles.card,styles.loginButton,styles.buttonContainer]}>
                        <Image source={logo1}
                            style={styles.image1}
                        />
                        <View style={styles.textview}>
                            <Text style={styles.textc}>Pharmacy</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>this.handleRoute('Pharm')}>
                    <View style={[styles.card,styles.loginButton,styles.buttonContainer]}>
                        <Image source={logo2}
                            style={styles.image1}
                        />
                        <View style={styles.textview}>
                            <Text style={styles.textc}>Diagnostics</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = {
    textview:{
        justifyContent:"center",
        width:100
    },
    textc:{
        textAlign:"center",
        // color:"white",
        fontWeight:"bold",
        // borderColor:"green",
        // borderWidth:2
    },
    card:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    image1:{
        width:50,
        height:50,
        margin:10,
        marginTop:25
    },
    nitin:{
        backgroundColor:"#222222",
        justifyContent:"center",
        flex:1,
        alignItems:"center",
        flexDirection:"column",
        
    },
    buttonContainer: {
        height:100,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom:20,
        width:200,
        // paddingTop:25,
        justifyContent:"center",
        // marginLeft: 15,
        borderRadius: 10
      },
      loginButton: {
        backgroundColor: "#FF6347",
      }
}
