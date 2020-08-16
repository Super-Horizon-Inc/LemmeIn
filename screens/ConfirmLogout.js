import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0,0,0,0)"
    },
    modalView: {
      backgroundColor: '#05346E',
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modalLabel: {
      marginBottom: 50,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
    },
    messageText: {
        textAlign: 'center',
        color: 'red',
    }
  });
  

export default class ConfirmLogout extends Component {

    constructor(props) {
        super(props);
        this.state ={
            text:""
        }
    }

    render () {

        return (
            <View style={styles.centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } supportedOrientations={["portrait", "landscape"]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Text style = {styles.modalLabel}>Admin Logout:</Text>
                                <Text style = {styles.modalText}>Please enter your password:</Text>
                            </View>
                            <View>
                                <Input containerStyle={{width: 200, color: 'white'}} labelStyle={{color: 'white'}}
                                            inputStyle={{color:'white'}} secureTextEntry={true}
                                            inputContainerStyle={{borderColor: 'white'}}
                                            clearButtonMode="while-editing" 
                                            onChangeText={ text => { this.setState({text:text})} } 
                                            value={this.state.text}
                                />
                                <Text style = {styles.messageText}>{ this.props.text }</Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop: 30}}>
                                <Button buttonStyle={{backgroundColor:'white'}} containerStyle={{width:'30%', marginHorizontal:10}} 
                                        title='Done' titleStyle={{color: '#05346E'}} onPress={() => this.props.done(this.state.text)} />
                                <Button buttonStyle={{backgroundColor:'white'}} containerStyle={{width:'30%', marginHorizontal:10}} 
                                        title='Cancel' titleStyle={{color: '#05346E'}} onPress={this.props.cancel} /> 
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>           
        )           
    }
}