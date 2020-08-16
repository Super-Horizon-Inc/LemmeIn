import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ValidationComponent from 'react-native-form-validator';
import moment from "moment";

import UserService from '../services/UserService.js';
import Confirm from './Confirm.js';


const styles = StyleSheet.create({
    container: {
        //flex: 1
    },
    inner: {
        //flex: 1,
        justifyContent: 'center',
        top: 50
    },
});

export default class Customer extends ValidationComponent {

    constructor(props) {

        super(props);

        this._customer = this.props.navigation.state.params.customer;

        this.state = {
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            phoneNumber: this._customer.phoneNumber,
            show: false,
            backspace: false,
            isValidDob: true,
            isConfirmVisible: false,
            confirmText: "",
        };

    }
    
    signup = async () => {
        this.validate({
            firstName: {maxlength: 50, required: true},
            lastName: {maxlength: 50, required: true},
            dob: {date: 'mm/dd/yyyy', required: true},
            email: {email: true, required: false}
        })

        // must use await to update this.state.isValidDob
        await this.validateDob(this.state.dob);

        if(this.isFormValid() && this.state.isValidDob) {
            
            let userService = new UserService();
            let customer = {
                "id" : this._customer.id,
                "phoneNumber" : this._customer.phoneNumber,
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "dob" : this.state.dob,
                "email" : this.state.email
            }
            try {
                await userService.updateCustomer(customer);
                this.setState({
                    isConfirmVisible: true,                    
                    confirmText: "Welcome in, " + this.state.firstName + "!"
                });
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen');
                }, 3000);             
            }
            catch(error) {    
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
            }        
        }     
    }

    cancel = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    showDatePicker = () => {
        this.setState({
            show: true
        });
        Keyboard.dismiss();
    }
    
    hideDatePicker = () => {
        this.setState({
            show: false
        })
    }

    onConfirm = (date) => {
        let dateString = new Intl.DateTimeFormat('en-us', {
            year: 'numeric',
            month: "2-digit",
            day: "2-digit"
        }).format(date);

        this.setState({
            dob: dateString
        });
        this.hideDatePicker();
    }

    inputDob = (text) => {
        let curText = text;
        if ((text.length == 2 || text.length == 5) && !this.state.backspace) {
            curText += '/';
        }
        this.setState({dob: curText})
    }

    validateDob = async (dob) => {
        let isValidDob = moment(dob, 'MM/DD/YYYY', true).isValid();
        isValidDob == true ? this.setState({isValidDob: true}) : this.setState({isValidDob: false});
    }


    render() {
        return (
            <LinearGradient colors={['#05346E', '#2B93C1', '#82B7A8']} 
                    style={[{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}, this.state.isConfirmVisible == true ? {opacity: 0.5} : {opacity: 1}]} >
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                                        keyboardVerticalOffset={
                                            Platform.select({
                                                ios: () => { return -150 }
                                            })()
                                        }
                                        style={styles.container}>
                    <View style={styles.inner}>

                        <View style={{ height:0 }}>
                            <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} />
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontWeight:'bold', color:'white'}}>Please enter your information to sign up{'\n\n'}</Text>
                            <Text style={{fontWeight:'bold', color:'white', fontSize:16}}>Phone Number: {this.state.phoneNumber}</Text>
                        </View>
                        
                        <View style={{top: 50}}>
                            <Input label="First Name" labelStyle={{color: 'white'}} 
                                    placeholder="Jon" inputStyle={{color:'white', marginLeft: 5}}
                                    inputContainerStyle={{borderColor: 'white'}}
                                    clearButtonMode="while-editing"
                                    leftIcon={<Icon name='user' size={24} color='white' />}
                                    onChangeText={text => this.setState({firstName: text})}
                                    value={this.state.firstName}
                                    errorMessage={this.isFieldInError('firstName') ? this.getErrorsInField('firstName')[0] : ""}
                            />

                            <Input label="Last Name" labelStyle={{color: 'white'}} 
                                    placeholder="Doe" inputStyle={{color:'white', marginLeft: 5}}
                                    inputContainerStyle={{borderColor: 'white'}}
                                    clearButtonMode="while-editing"
                                    leftIcon={<Icon name='user' size={24} color='white' />}
                                    onChangeText={text => this.setState({lastName: text})}
                                    value={this.state.lastName}
                                    errorMessage={this.isFieldInError('lastName') ? this.getErrorsInField('lastName')[0] : ""}
                            />

                            <Input label="DOB (mm/dd/yyyy)" labelStyle={{color: 'white'}} 
                                    placeholder="01/01/2000" inputStyle={{color:'white', marginLeft: -5}}
                                    inputContainerStyle={{borderColor: 'white'}}
                                    clearButtonMode="while-editing" maxLength={10}
                                    leftIcon={<Icon.Button name="calendar" size={24} color="white" 
                                                backgroundColor="rgba(0,0,0,0)" underlayColor="rgba(0,0,0,0)"
                                                borderRadius={0} style={{padding:0}} onPress={ () => {this.showDatePicker()}}
                                            />}
                                    keyboardType="number-pad" returnKeyType="done"
                                    onChangeText={ text => {this.inputDob(text)} }
                                    onKeyPress={ ({ nativeEvent }) => {nativeEvent.key === 'Backspace' ? this.setState({backspace: true}) : this.setState({backspace: false});} }
                                    value={this.state.dob}
                                    errorMessage={ (this.isFieldInError('dob') || !this.state.isValidDob) ? "The field \"DOB\" must be a valid date (mm/dd/yyyy)." : ""}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.show}
                                //minimumDate={new Date(0)}
                                //maximumDate={new Date()}
                                mode="date"
                                onConfirm={this.onConfirm}
                                onCancel={this.hideDatePicker}
                            />

                            <Input label="Email Address (optional)" labelStyle={{color: 'white'}} 
                                    placeholder="jondoe@gmail.com" inputStyle={{color:'white', marginLeft: 5}}
                                    inputContainerStyle={{borderColor: 'white'}}
                                    clearButtonMode="while-editing"
                                    leftIcon={<Icon name="envelope" size={24} color="white" />}
                                    keyboardType="email-address"
                                    onChangeText={ text => this.setState({email: text}) }
                                    value={this.state.email}
                                    errorMessage={this.isFieldInError('email') ? this.getErrorsInField('email')[0] : ""} 
                            />

                        </View>
                        <View style={{top: 100}}>
                            <Button buttonStyle={{backgroundColor:'white'}} title="Sign Up" titleStyle={{color: '#2B93C1'}} onPress={this.signup} />
                            <Button buttonStyle={{backgroundColor:'white', marginTop: 30}} title="Cancel" titleStyle={{color: '#2B93C1'}} onPress={this.cancel} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        ); 
    };
}