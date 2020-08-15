import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: 22,
      backgroundColor: '#6f6d6dFF',
    },
    modalView: {
      backgroundColor:'#043030FF',
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
                                            onChangeText={ text => { this.setState({text:text})} } 
                                            value={this.state.text}
                                />
                                <Text style = {styles.messageText}>{ this.props.text }</Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop: 30}}>
                                <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='Done' onPress={() => this.props.done(this.state.text)} />
                                <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='Cancel' onPress={this.props.cancel} /> 
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>           
        )           
    }
}