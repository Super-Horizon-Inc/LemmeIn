import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Button } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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

    }

    submit = () => {
        console.log(this.props);
        this.props.navigation.navigate('HomeScreen');

    }

    cancel = () => {
        this.props.isVisible = false;
    }

    render () {

        return (
            <View style={styles.centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible }>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style = {styles.modalText}>
                                <Text style={[styles.labelText, {textAlign:'center'}]}>{'\n'}Is this your information?</Text>                               
                                <Text style={styles.labelText}>{'\n'}First Name: </Text>
                                { (this.props.customer != null) 
                                ?
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
                                    <Text style={styles.labelText}>{'\n'}Visited Times: </Text>
                                    <Text>{this.props.customer.visitCounter}</Text>
                                </View>
                                :
                                <View></View>}
                            </View>
                            <View style={{ flexDirection:"row", padding: 15}}>
                                <View style={{width: "50%"}}>
                                    <Button title="Done" type="solid" onPress={this.submit} style={{width: "90%", paddingLeft: "5%", backgroundColor: "blue"}} />
                                </View>
                                <View style={{width: "50%"}}>
                                    <Button title="Cancel" type="solid" onPress={this.cancel} style={{width: "90%", paddingLeft: "5%", backgroundColor: "blue"}} />
                                </View>
                            </View>     
                        </View>
                    </View>
                </Modal>
            </View>           
        )           
    }
}