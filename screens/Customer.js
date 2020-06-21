import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Logo from './Logo.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Input, Button } from 'react-native-elements';

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
});

export default class Customer extends Component {

    constructor(props) {

        super(props);

        const pickedPhoneOrEmail = this.props.navigation.state.params.selectedIndex == 0 ? true : false;

        this.state = {
            name: "",
            dob: "",
            label: pickedPhoneOrEmail ? "Email Address" : "Phone Number",
            placeholder: pickedPhoneOrEmail ? "email@address.com" : "(512) 123-4567",
            icon: pickedPhoneOrEmail ? "envelope" : "phone",
            keyboardType: pickedPhoneOrEmail ? "email-address" : "phone-pad",
            returnKeyType: pickedPhoneOrEmail ? null : {returnKeyType:'done'},
            input: "",
            pickedPhoneOrEmail: pickedPhoneOrEmail,
        };

    }
    
    submit = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                                    keyboardVerticalOffset={
                                        Platform.select({
                                            ios: () => {
                                                if(this.state.pickedPhoneOrEmail) {
                                                    return -150;
                                                }
                                                else{
                                                    return -150;
                                                }
                                            }
                                        })()
                                    }
                                    style={styles.container}>
                <View style={styles.inner}>
                    <Logo />
                    <View>
                        <Input label="Full Name" placeholder="Jon Doe" 
                                leftIcon={<Icon name='user' size={24} color='black' />}
                                onChangeText={text => this.setState({name: text})}
                                value={this.state.name}
                        />
                        <Input label={this.state.label} placeholder={this.state.placeholder}
                                leftIcon={<Icon name={this.state.icon} size={24} color="black" />}
                                keyboardType={this.state.keyboardType}
                                {...this.state.returnKeyType}
                                onChangeText={ text => this.setState({input: text}) }
                                value={this.state.input} />
                        <DatePicker  mode="date" //The enum of date and time
                                    placeholder="DD-MM-YYYY"
                                    format="DD-MM-YYYY" 
                                    minDate="01-01-1900" //maxDate="01-01-2020"
                                    confirmBtnText="Confirm" cancelBtnText="Cancel" style={{width:"97%"}}
                                    iconSource={require('../assets/calendar-icon.png')}
                                    customStyles={{
                                        dateIcon: {
                                            position: "absolute", 
                                            left: 10, 
                                            top: 10, 
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 10, 
                                            borderTopWidth: 0, 
                                            borderLeftWidth: 0, 
                                            borderRightWidth: 0, 
                                            borderBottomWidth: 1.2, 
                                            fontSize: 50,
                                            top: 20,
                                        }
                                    }} 
                                    onDateChange={(date) => this.setState({dob: date})}
                                    date={this.state.dob}
                        />
                    </View>
                    <View style={{top: "10%"}}>
                        <Button title="Submit" type="solid" onPress={this.submit} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        ); 
    };
}