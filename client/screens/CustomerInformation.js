import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const portraitStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8ABAD3FF',
    },
    modalView: {
      backgroundColor:'#FCF6F5FF',
      borderRadius: 20,
      marginHorizontal: 10,
      padding: 40,
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
      textAlign: 'center'
    },
    labelText: {
      marginTop: 15,
      fontWeight:'bold',
    }
  });

const landscapeStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8ABAD3FF',
    },
    modalView: {
      backgroundColor:'#FCF6F5FF',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 40,
      marginHorizontal: 120,
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
      marginBottom: 8,
      textAlign: 'center'
    },
    labelText: {
      marginTop: 8,
      fontWeight:'bold',
    }
  });
  

export default class CustomerInformation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isConfirmVisible: false,           
            confirmText: "",
            orientation: this.isPortrait() ? "portrait" : "landscape", 
        }

    }

    isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    getStyle = () => (
        this.state.orientation == "portrait" ? portraitStyles : landscapeStyles 
    )

    onOrientationChange = () => {
        this.setState({orientation: this.isPortrait() ? "portrait" : "landscape"});
    }

    render () {

        return (          
            <View style={this.getStyle().centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } 
                        supportedOrientations={["portrait", "landscape"]} onOrientationChange={this.onOrientationChange}>
                    <View style={this.getStyle().centeredView}>
                        <View style={this.getStyle().modalView}>
                            <View style = {this.getStyle().modalText}>
                                <Text style={[this.getStyle().labelText, {textAlign:'center'}]}>Is this your information?</Text>                               
                                <View>    
                                    <Text style={this.getStyle().labelText}>First Name: </Text>               
                                    <Text>{this.props.customer.firstName}</Text>
                                    <Text style={this.getStyle().labelText}>Last Name: </Text>
                                    <Text>{this.props.customer.lastName}</Text>
                                    <Text style={this.getStyle().labelText}>Phone Number: </Text>
                                    <Text>{this.props.customer.phoneNumber}</Text>
                                    <Text style={this.getStyle().labelText}>Email: </Text>
                                    <Text>{this.props.customer.email}</Text>
                                    <Text style={this.getStyle().labelText}>Date of Birth: </Text>
                                    <Text>{this.props.customer.dob}</Text>
                                    <Text style={this.getStyle().labelText}>Visiting Times: </Text>
                                    <Text>{this.props.customer.visitCounter}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width: '50%'}}>
                                    <Button title="Yes" type="solid" onPress={this.props.done} style={{width: '90%', padding: '5%'}} />
                                </View>
                                <View style={{width: "50%"}}>
                                    <Button title="No" type="solid" onPress={this.props.hideModal} style={{width: '90%', padding: '5%'}} />
                                </View>
                            </View>     
                        </View>
                    </View>
                </Modal>
            </View>        
        )           
    }
}