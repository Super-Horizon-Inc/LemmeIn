import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';
import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        top: -110,
    },
    input: {
        width: '85%',
        position: 'absolute',
        left: '7%',
        top: '130%',
        color: 'white'
    },
    button: {
        top: 150,
        width: '85%',
        position: 'absolute',
    }
});

export default class Home extends ValidationComponent {

    constructor(props) {

        super(props);

        this.state = {
            selectedIndex: 0,
            email: "",
            phone: "",
            isValidPhoneNumber: true,
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
                email: "",
            });

            this.validate({
                email: {required: false}
            })

        }
        // user has selected `Email Address`
        else 
        {

            this.setState({
                isValidPhoneNumber: true,
                phone: "",
            });

        }

    };

    lemmeIn () {

        if (this.state.selectedIndex == 0) { 
            
            if (this.isValidPhoneNumber()) {
                this.setState({isValidPhoneNumber: true});
            }
            else {
                this.setState({isValidPhoneNumber: false});
            }

        }
        else {
            this.validate({
                email: {email: true}
            })
        }
        
        setTimeout( () => {
            if (!this.isFieldInError("email") && this.state.isValidPhoneNumber) {

                const isPhoneNumber = this.state.selectedIndex == 0 ? true : false;
                let phoneNumber = "";
                if (isPhoneNumber) {
                    phoneNumber = this.state.phone.split('+1 ')[0] != this.state.phone ? this.state.phone.split('+1 ')[1] : this.state.phone;

                }
                const confirmSubtext = isPhoneNumber ? "a message to: " : "an email to: ";
                this.setState({
                    isConfirmVisible: true, 
                    confirmText: "Please wait ... \nWe are sending " + confirmSubtext + this.state.email,
                });
    
                fetch('https://1e22fe88c860.ngrok.io/lemmein/customers', {
                    method: 'POST',
                    headers: {
                        Accept : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: isPhoneNumber ? JSON.stringify({phoneNumber:phoneNumber}) : JSON.stringify({email:this.state.email.toLowerCase()})
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
                            confirmText: "Email was sent successfully.\n\n Welcome in!"
                        });
    
                        setTimeout(() => {
                            this.setState({
                                isConfirmVisible: false,                         
                                confirmText: "",
                                email: "",
                            });
                        }, 2000);
    
                    }
                    else {
    
                        this.props.navigation.navigate("CustomerListScreen", {customerList: json, selectedIndex: this.state.selectedIndex});
    
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
                });
    
            }
        }, 0);
           
    };

    onPhoneChange = (text) => {

        const phoneNumber = this.formatPhoneNumber(text);
        phoneNumber != null ? this.setState({phone: phoneNumber}) : this.setState({phone: text});

    }

    formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    isValidPhoneNumber = () => (
        this.formatPhoneNumber(this.state.phone) != null ? true : false
    )

    render () {

        return (
            <LinearGradient colors={['#8ABAD3FF', '#FCF6F5FF', '#FCF6F5FF', '#FCF6F5FF', '#8ABAD3FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
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
                            <View style={{ height:0 }}>
                                <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} />
                            </View>
                            <Logo />
                            <View>
                                <View>
                                    <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex}
                                                buttons={["Phone Number", "Email Address"]} containerStyle={{height: 100, borderColor: '#FCF6F5FF'}} />
                                    
                                    {this.state.selectedIndex == 1 
                                        ?
                                            <Input ref="email" containerStyle={styles.input} label={"Email Address"}
                                                placeholder={"email@address.com"} 
                                                leftIcon={<Icon name={"envelope"} size={24} color='black' />}
                                                keyboardType={"email-address"}
                                                onChangeText={ text => this.setState({email: text}) } 
                                                value={this.state.email}
                                                errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} />
                                        :
                                            <Input ref="phone" containerStyle={styles.input} label={"Phone Number"}
                                                placeholder={"(512) 123-4567"} 
                                                leftIcon={<Icon name={"phone"} size={24} color='black' />}
                                                keyboardType={"phone-pad"} returnKeyType={"done"}
                                                onChangeText={ (text) => {this.onPhoneChange(text)} } 
                                                value={this.state.phone}
                                                errorMessage={!this.state.isValidPhoneNumber ? "The field \"phone\" must be a valid phone number." : ""} />
                                    }                         
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Button containerStyle={styles.button} title="Lemme In" type="solid" onPress={this.lemmeIn} />
                                </View>
                            </View>
                        </View>
                    
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }      
}