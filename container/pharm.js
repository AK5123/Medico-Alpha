import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform
} from 'react-native';
import searchlogo from './../assets/search.jpg';
import SearchBar from 'react-native-search-bar'
import axios from 'axios';
import Card from './../components/card';
import Bubble from './../components/bubble';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import getDistance from 'geolib/es/getDistance';



export default class App extends Component{

    state = {
        search:"search here!!",
        elements: [],
        details:[],
        currentLongitude: 'unknown',
        currentLatitude: 'unknown',
        answer:[],
        pressPlus: false
    }

    gogo = (obj) => {
        return getDistance(obj,{latitude: this.state.currentLatitude, longitude: this.state.currentLongitude})
    }

    componentDidMount = () => {
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location'
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                that.callLocation(that);
              } else {
                alert("Permission Denied");
              }
            } catch (err) {
              alert("err",err);
              console.warn(err)
            }
          }
          requestLocationPermission();
        }    
       }

       callLocation(that){
        //alert("callLocation Called");
          Geolocation.getCurrentPosition(
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                let d={
                    latitude:51.525,
                    longitude:7.4575
                };

                that.setState({ currentLongitude:currentLongitude });
                that.setState({ currentLatitude:currentLatitude });
                console.log("yoyo",this.state)
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        }


    handleText = (text)=>{
        if(text.slice(0,text.length-1) == "search here!!"){
            this.setState({
                search:""+text.slice(text.length-1,text.length)
            })
        }
        else{
            this.setState({
                search:text
            })
        }
    }

    handleAdd = ()=>{
        let s = this.state;
        let newArray = s.elements;
        newArray.push(s.search)
        this.setState({
            search: "",
            elements: newArray,
            pressPlus: true
        });
        let tablet = this.state.elements[this.state.elements.length-1];
        console.log();
        axios.post("http://192.168.43.233:3000/search",{
            input:tablet
        }).then( data =>{
            let val = data["data"];
            console.log(val);
            // console.log(this.state.details)
            let newDetails = this.state.details
            newDetails.push(val)
            console.log("before set state");
            this.setState({
                details: newDetails
            })
            console.log("after set state");
        }).catch(err=>console.log(err)) 
    }

    renderCards(){
        if(this.state.answer === []){
            return(
                <View>
                </View>
            )
        }
        else{
            return this.state.answer.map((ele,i) =>{
                console.log("abbi",ele)
                return (
                    <Card
                    key={i}
                    answer={ele}
                    /> 
                    )
                })
            } 
  
    }

    handlerender = () =>{
        if(!this.state.pressPlus){
            console.log("work")
            this.handleAdd();
            
        }


        setTimeout(()=> {
            let distpharm = {};
        console.log(Object.keys(this.state.details))
        Object.keys(this.state.details).forEach(data1 => {
            let data = this.state.details[data1]
        Object.values(data).forEach( ele1 => {
            ele1.forEach( ele => {
                    if(Object.keys(distpharm).indexOf(ele["name"]) == -1){
                         console.log("hoi",ele);    
                          distpharm[ele["name"]] = {tablet:[ele["med"]["name"]],
                                                    price:[ele["med"]["price"]],
                                                    count:1,
                                                    loc:ele["name"],
                                                    latitude:ele["latlng"].split(',')[0],
                                                    longitude:ele["latlng"].split(',')[1],
                                                    distance: this.gogo({latitude:ele["latlng"].split(',')[0],longitude:ele["latlng"].split(',')[1]}),
                                                    address:ele["address"],
                                                    photo:ele["photo"]
                                                };
                    }
                    else{
                            console.log("huq",distpharm[ele["name"]]["tablet"]);
                            console.log(ele["med"]["name"]);
                            distpharm[ele["name"]]["tablet"].push(ele["med"]["name"])
                            distpharm[ele["name"]]["count"] = distpharm[ele["name"]]["count"]+1;
                            distpharm[ele["name"]]["price"] =  (+distpharm[ele["name"]]["price"]) + (+[ele["med"]["price"]]);
                    }
                    });
            })
        })

       let answer= Object.values(distpharm);
       console.log("dist",distpharm);
       console.log(answer)
       answer.sort(function(a, b) { 
            return b.count - a.count;
        })
        
        let sameCountlist = [];
        let result = [];
        console.log("boom:",answer);
        let sc = answer[0]["count"];
        answer.forEach(ele=>{
            if(ele["count"] == sc){
                sameCountlist.push(ele)
            }
            else{
                sameCountlist.sort((a,b)=>{
                    return a.distance - b.distance
                })
                console.log("nitin:",sameCountlist);
                result = result.concat(sameCountlist);
                sc = ele["count"]
                sameCountlist = [];
                sameCountlist.push(ele);
            }

        })
        if(sameCountlist.lengh!=0){
            sameCountlist.sort((a,b)=>{
                return a.distance - b.distance
            })
            console.log("nitin:",sameCountlist);
            result = result.concat(sameCountlist);
            console.log(result);
            sameCountlist = [];
        }


        
        console.log(answer);
        this.setState({
            answer:result,
        })

          }, 5000);



        


    }

    render(){

        let bubs = <View></View>
        if(this.state.elements.length!==0){
            // console.log(this.state.elements);
            bubs = this.state.elements.map( ele=>{
                return(
                    <Bubble
                    key={ele}
                    text={ele}
                    />
                    )
                })
            }

        return(
            <View style={styles.panel}>
                <View style={styles.searchele}>
                    <TextInput 
                       style={styles.searchbox}
                        onChangeText={(text)=>this.handleText(text)}
                        value={this.state.search}/>
                        <TouchableOpacity 
                        style={styles.addbutton1}
                        onPress={this.handleAdd}>
                            <Text style={styles.add}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.addbutton}
                        onPress={this.handlerender}>
                            <Image source={searchlogo}
                                style={styles.image1}                                
                            />
                        </TouchableOpacity>
                </View>
                <View style={styles.bubbleview}>
                    {bubs}
                </View>
                <ScrollView style={styles.scroll}>
                    {this.renderCards()}
                </ScrollView>
            </View>
        )
    }
};

const styles = {
    scroll:{
        // marginTop:10,
        paddingHorizontal:20,
        // marginBottom:150
        // borderWidth:1,
        // borderColor:"green"
    },
    searchele:{
        flexDirection:"row",
        margin:10,
        color:"white",
        shadowColor:'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        elevation: 2,

    },
    searchbox:{
        width:Dimensions.get('window').width*0.65,
        height:40,
        backgroundColor:'#383838',
        // borderWidth:1,
        // shadowColor:'#000',
        // shadowOffset: {width: 0, height: 3},
        // shadowOpacity: 0.3,
        // elevation: 1,
        borderRadius:3,
        color:"#FF6347",
        textAlign:"center"
    },
    addbutton1:{
        width:Dimensions.get('window').width*0.11,
        height:40,
        backgroundColor:"#383838",
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:3

    },
    addbutton:{
        width:Dimensions.get('window').width*0.11,
        height:40,
        backgroundColor:"red",
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:10
    },
    add:{
        color:"#FF6347",
        fontSize:35,
        // textAlign:"center"
    },
    bubbleview:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginHorizontal:10
        // padding:5
    },
    image1:{
        height:30,
        width:30
    },
    panel:{
        backgroundColor:"black",
        flex:1
        // marginBottom:100
    }
}