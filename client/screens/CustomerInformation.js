import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Confirm from './Confirm.js';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
      marginBottom: 100,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      //alignItems: "center",
      shadowColor: "#000",
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
      textAlign: "center"
    },
    labelText: {
      fontWeight:'bold',
    }
  });
  

export default class CustomerInformation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isConfirmVisible: false,           
            confirmText: "",
        }

    }

    onOrientationChange = () => {
        console.log("AAA");
    }

    render () {

        return (
            <View style={styles.centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } 
                        supportedOrientations={['portrait', 'landscape']} onOrientationChange={this.onOrientationChange}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style = {styles.modalText}>
                                <Text style={[styles.labelText, {textAlign:'center'}]}>{'\n'}Is this your information?</Text>                               
                                <Text style={styles.labelText}>{'\n'}First Name: </Text>
                                <View>
                                    <Text>{this.props.customer.firstName}</Text>
                                    <Text style={styles.labelText}>{'\n'}Last Name: </Text>
                                    <Text>{this.props.customer.lastName}</Text>
                                    <Text style={styles.labelText}>{'\n'}Phone Number: </Text>
                                    <Text>{this.props.customer.phone}</Text>
                                    <Text style={styles.labelText}>{'\n'}Email: </Text>
                                    <Text>{this.props.customer.email}</Text>
                                    <Text style={styles.labelText}>{'\n'}Date of Birth: </Text>
                                    <Text>{this.props.customer.dob}</Text>
                                    <Text style={styles.labelText}>{'\n'}Visiting Times: </Text>
                                    <Text>{this.props.customer.visitCounter}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection:"row", padding: 15}}>
                                <View style={{width: "50%"}}>
                                    <Button title="Yes" type="solid" onPress={this.props.done} style={{width: "90%", paddingLeft: "5%"}} />
                                </View>
                                <View style={{width: "50%"}}>
                                    <Button title="No" type="solid" onPress={this.props.hideModal} style={{width: "90%", paddingLeft: "5%"}} />
                                </View>
                            </View>     
                        </View>
                    </View>
                </Modal>
            </View>           
        )           
    }
}