import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, ActivityIndicator } from 'react-native';

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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white',
    }
  });
  

export default class Confirm extends Component {

    constructor(props) {

        super(props);

    }

    render () {

        return (
            <View style={styles.centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } supportedOrientations={["portrait", "landscape"]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ActivityIndicator size='large' color='#0000ff' />
                            <Text style = {styles.modalText}>{this.props.text}</Text>
                        </View>
                    </View>
                </Modal>
            </View>           
        )           
    }
}