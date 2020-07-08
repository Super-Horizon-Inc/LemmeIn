import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        top: -110,
    },
    input: {
        width: '85%',
        position: 'absolute',
        left: '7%',
        top: '130%'
    },
    button: {
        top: 150,
        width: '85%',
        position: 'absolute',
    }
});

export default class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedIndex: 0,
            label: "Phone Number",
            placeholder: "(512) 123-4567",
            icon: "phone",
            keyboardType: "phone-pad",
            returnKeyType: {returnKeyType:'done'}, // setting returnKeyType property at runtime - dynamically
            input: "",
            isConfirmVisible: false,
            confirmText: "",
            
        };

        /**
         * Pass this to the functions, so functions know that what is `this`
         */
        this.updateIndex = this.updateIndex.bind(this);
        this.lemmeIn = this.lemmeIn.bind(this);

    };

    updateIndex (selectedIndex) {

        this.setState({selectedIndex});

        // user has selected `Phone Number`
        if(selectedIndex == 0) {

            this.setState({ 
                label: "Phone Number", 
                placeholder: "(512) 123-4567",
                icon: "phone",
                keyboardType: "phone-pad",
                returnKeyType: {returnKeyType:'done'},
                input: "",
            });

        }
        // user has selected `Email Address`
        else 
        {

            this.setState({
                label: "Email Address", 
                placeholder: "email@address.com",
                icon: "envelope",
                keyboardType: "email-address",
                returnKeyType: null,
                input: "",
            });

        }

    };

    lemmeIn () {
        
        const isPhoneNumber = this.state.selectedIndex == 0 ? true : false;
        const confirmSubtext = isPhoneNumber ? "a message to: " : "an email to: ";
        this.setState({
            isConfirmVisible: true, 
            confirmText: "Please wait. We are sending \n" + confirmSubtext + this.state.input,
        });

        fetch('https://4e11c79b26a6.ngrok.io/lemmein/customers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: isPhoneNumber ? JSON.stringify({phoneNumber:this.state.input}) : JSON.stringify({email:this.state.input})
        })
        .then(response => 
            response.json()
            
        )
        .then(json => {
            //const selectedIndex = this.state.selectedIndex;
            //this.props.navigation.navigate("CustomerScreen", {selectedIndex: selectedIndex});

            if (json[0].isNew) {

                this.setState({
                    isConfirmVisible: true,                    
                    confirmText: "Email was sent successfully."
                });

                setTimeout(() => {
                    this.setState({
                        isConfirmVisible: false,                         
                        confirmText: "",
                    });
                }, 5000);

            }
            else {

                this.props.navigation.navigate("CustomerListScreen", {customerList: json});

            }
        })
        .catch(error => {
            this.setState({
                isConfirmVisible: true,                
                confirmText: "Sorry! Something went wrong."
            });
            setTimeout(() => {
                this.setState({
                    isConfirmVisible: false, 
                    confirmText: "",
                });
            }, 5000);
            console.error(error);
        });      
    };

    render () {

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                                    keyboardVerticalOffset={
                                        Platform.select({
                                            ios: () => {
                                                if(this.state.selectedIndex == 0) {
                                                    return 150;
                                                }
                                                else{
                                                    return 140;
                                                }
                                            }
                                        })()
                                    }
                                    style={styles.container}>
                <View style={styles.inner}>
                    <Confirm isVisible = {this.state.isConfirmVisible} text = {this.state.confirmText} />
                    <Logo />
                    <View>
                        <View>
                            <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex}
                                        buttons={["Phone Number", "Email Address"]} 
                                        containerStyle={{height: 100}} />
                            <Input containerStyle={styles.input} label={this.state.label}
                                    placeholder={this.state.placeholder}
                                    leftIcon={<Icon name={this.state.icon} size={24} color='black' />}
                                    keyboardType={this.state.keyboardType}
                                    {...this.state.returnKeyType}
                                    onChangeText={text => this.setState({input: text}) }
                                    value={this.state.input} />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Button containerStyle={styles.button} title="Lemme In" type="solid"
                                    onPress={this.lemmeIn} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
        
}