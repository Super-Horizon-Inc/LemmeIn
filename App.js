import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox, Button, Image } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        top: -110,
    },
    phoneNumber: {
        width: '85%',
        position: 'absolute',
        right:0,
    },
    emailAddress: {
        width: '85%',
        position: 'absolute',
        right:0,
        top:50,
    },
    emailCheckBox: {
        top: 50,
    },
    btnLemmeIn: {
        top: 100,
        width: '85%',
        position: 'absolute',
    }
});

export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            emailChecked: false,
            emailAddressValue: "",
            phoneChecked: true,
            phoneNumberValue: "",
        };

    };

    onEmailSelected() {
        this.setState({ emailChecked: !this.state.emailChecked});
        this.setState({ phoneChecked: false});
        this.setState({ phoneNumberValue: ""});
    };

    onPhoneSelected() {
        this.setState({ phoneChecked: !this.state.phoneChecked});
        this.setState({ emailChecked: false});
        this.setState({ emailAddressValue: ""});
    };

    render () {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                                    style={styles.container}>
                <View style={styles.inner}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('./assets/app-logo.png')} style={{ width: 200, height: 200 }}/>
                    </View>
                    <View>
                        <View>
                            <CheckBox checkedIcon='dot-circle-o' uncheckedIcon='circle-o' 
                                        onPress={ () => this.onPhoneSelected() } 
                                        checked= {this.state.phoneChecked}
                            />
                            <Input containerStyle={styles.phoneNumber} label="Phone Number" 
                                    placeholder="(512) 123-4567" 
                                    leftIcon={<Icon name='phone' size={24} color='black' />}
                                    keyboardType="phone-pad" 
                                    returnKeyType='done'
                                    disabled={!this.state.phoneChecked}
                                    defaultValue={this.state.phoneNumberValue}
                            />
                        </View>
                        <View>
                            <CheckBox containerStyle={styles.emailCheckBox} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' 
                                        onPress={ () => this.onEmailSelected() } 
                                        checked= {this.state.emailChecked}
                            />
                            <Input containerStyle={styles.emailAddress} label="Your Email Address" 
                                    placeholder="email@address.com"
                                    leftIcon={<Icon name='envelope' size={24} color='black' />}
                                    keyboardType="email-address"
                                    disabled={!this.state.emailChecked}
                                    defaultValue={this.state.emailAddressValue}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Button containerStyle={styles.btnLemmeIn} title="Lemme In" type="solid" />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
        
}