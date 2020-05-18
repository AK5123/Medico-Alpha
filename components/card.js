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
  Linking
} from 'react-native';
import axios from 'axios';
import storeimg from './../assets/store.jpg';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Bubble from './bubble';


export default class App extends Component{
    render(){

        let lat = parseFloat(this.props.answer["latitude"])
        let lng = parseFloat(this.props.answer["longitude"])
        let dist = this.props.answer.distance/1000;
        console.log("itsme:",dist);

        let list = <View></View>
        list = this.props.answer.tablet.map(ele=>{
            return (
                <Bubble
                // style={styles.white}
                text={ele}
                key={ele}
                />)
        })
        console.log("!!!",this.props.answer)
        console.log("lat:",lat,"lng:",lng);

        return(
            <View style={styles.main}>               
                <Card style={styles.cardstyle} isDark={true}>
                    <CardImage 
                    style={styles.image1}
                    source={{uri:this.props.answer.photo}} 
                    title={this.props.answer.loc}
                    />
                    <View style={styles.address}>
                        <Text style={{color:"white"}}>
                            {this.props.answer.address}
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                            <Text style={{color:"orange"}}>
                                {dist + "km"}
                            </Text>
                            <Text  style={{color:"orange"}}> {this.props.answer.price + " ₹"}</Text>
                        </View>
                    </View>
                    {/* <CardContent text="chenna ngfhghjfjh nhvhhhj mbhjghjgjhgjhhjjkggkkkkkkkggggggggggggggggggggggggggggggi" /> */}
                    <Text style={styles.red}>Availability</Text>
                    <View style={styles.availablelist}>
                        {list}
                    </View>
                    <CardAction 
                    separator={true} 
                    inColumn={false}>
                        {/* <View style={styles.btnview}> */}

                    <CardButton
                        onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`)}
                        title="Explore in map"
                        color={"white"}
                        style={styles.cardbtn}
                        />
                    {/* </View> */}
                    </CardAction>
                </Card>
                
                </View>
        )
    }
};

const styles ={
    address:{
        padding:20,
        width:"100%"
    },
    cardstyle:{
        backgroundColor:'#333333',
        borderRadius:10,
        marginBottom:10,
    },
    image1:{
        borderRadius:10
    },
    main:{
        // borderColor:"green",
        // borderWidth: 2,
    },
    availablelist:{
        padding:10,
        flexWrap:"wrap",
        flexDirection:"row"
    },
    white:{
        color:"white"
    },
    red:{
        // fontWeight:10,
        color:"#FF6347",
        padding:10
    },
    cardbtn:{
        backgroundColor:"red",
        alignItems:"center",
        justifyContent: "center",
        paddingLeft: 20,
        marginLeft: 100,
        color:"white"
    },
    // btnview:{
    //     alignItems:"center",
    //     justifyContent: "center",

    // }
}