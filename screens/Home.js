import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { List } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';

import Confirm from './Confirm.js';
import ConfirmLogout from './ConfirmLogout.js';
import UserService from '../services/UserService.js';
import AuthService from '../services/AuthService.js';
import VirtualKeyboard from './VirtualKeyboard.js';
import Logo from './Logo.js';


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        width: '40%',
        //backgroundColor: 'gray',
        //marginRight: 200
    },
    inner: {
        //flex: 1,
        //marginLeft: 50,
        //marginRight: 100,
        width: '100%',
        justifyContent: 'center',
        top: 100,
        //marginHorizontal: 20,
        marginRight: 200,
        marginLeft: 40
    },
    input: {
        //position: 'absolute',
        //left: '7%',
        //top: '130%',
        color: 'white'
    }
});

export default class Home extends ValidationComponent {

    constructor(props) {

        super(props);

        this.authService = new AuthService();

        this.state = {
            phoneNumber: "",
            isValidPhoneNumber: true,
            isConfirmVisible: false,
            confirmText: "",
            isLogoutVisible: false,
            logoutText: ""      
        };

        /**
         * Pass this to the functions, so functions know that what is `this`
         */
        this.lemmeIn = this.lemmeIn.bind(this);

    };

    async lemmeIn () {

        if (this.isValidPhoneNumber()) {
            this.setState({isValidPhoneNumber: true});
        }
        else {
            this.setState({isValidPhoneNumber: false});
        }
      
        setTimeout( async () => {

            if (this.state.isValidPhoneNumber) {

                let phoneNumber = this.state.phoneNumber.split('+1 ')[0] != this.state.phoneNumber ? this.state.phoneNumber.split('+1 ')[1] : this.state.phoneNumber;

                this.setState({
                    isConfirmVisible: true, 
                    confirmText: "Please wait ... \nWe are looking for your phone number: " + this.state.phoneNumber + " in our database."
                });

                let userService = new UserService();
                const username = await this.authService.getCurrentUsername();
                
                try {
                    let _customer = await userService.showOrAddCustomer({phoneNumber:phoneNumber, username:username})
                    
                    if (_customer.visitCounter == 0) {   
                        this.props.navigation.navigate("CustomerScreen", {customer: _customer});
                    }
                    else {
                        let customer = await userService.updateCustomer(_customer);
                        this.setState({
                            isConfirmVisible: true,                    
                            confirmText: "Welcome in, " + customer.firstName + "!\n\n Your visiting times is: " + customer.visitCounter
                        });
    
                        setTimeout(() => {
                            this.setState({
                                isConfirmVisible: false,                         
                                confirmText: "",
                                phoneNumber:""
                            });
                        }, 5000);   
                    }
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
                    //console.log(error);
                }   
            }
        }, 0);           
    };

    onPhoneChange = (text) => {
        const phoneNumber = this.formatPhoneNumber(text);
        phoneNumber != null ? this.setState({phoneNumber: phoneNumber}) : this.setState({phoneNumber: text});
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
        this.formatPhoneNumber(this.state.phoneNumber) != null ? true : false
    )

    showLogout = () => {
        this.setState({isLogoutVisible: true});
    }

    hideLogout = () => {
        this.setState({isLogoutVisible: false});
    }

    logoutDone = async (password) => {

        const username = await this.authService.getCurrentUsername();
        const message = await this.authService.logout({username: username, password: password});
        
        if (message.indexOf('Logout successfully.') >= 0) {
            this.hideLogout();
            this.props.navigation.navigate("AuthenticationScreen");
        }
        else {
            this.setState({
                isSettingVisible: true,
                logoutText: message
            })
        }
    }


    render () {
        return (
            <LinearGradient colors={['#05346E', '#2B93C1', '#82B7A8']} 
                            style={[{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', flexDirection: 'row'}, 
                                (this.state.isConfirmVisible == true || this.state.isLogoutVisible == true) ? {opacity: 0.5} : {opacity: 1}]} >
                <ScrollView style={{width: '100%'}} directionalLockEnabled={false} horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
                    <ScrollView style={{width: '40%', marginVertical: 200,  marginLeft: 20, marginRight: 100}} showsVerticalScrollIndicator={false} bounces={false}>
                        <List.Item
                            //titleNumberOfLines='2'
                            title="5 Times"
                            titleStyle={{color: 'white'}}
                            description="get 10% off"
                            descriptionStyle={{color: 'white'}}
                            //left={props => <List.Icon {...props} icon="gift-outline" color='white' />}
                            //titleEllipsizeMode={'head'}
                            style={{paddingVertical: 20, borderWidth: 1, borderColor: 'white', margin: 30}}
                        />
                        <List.Item
                            title="10 Times"
                            titleStyle={{color: 'white'}}
                            description="get 15% off"
                            descriptionStyle={{color: 'white'}}
                            //left={props => <List.Icon {...props} icon="gift-outline" color='white' />}
                            style={{paddingVertical: 20, borderWidth: 1, borderColor: 'white', margin: 30}}
                        />
                        <List.Item
                            title="20 Times"
                            titleStyle={{color: 'white'}}
                            description="get 20% off"
                            descriptionStyle={{color: 'white'}}
                            //left={props => <List.Icon {...props} icon="gift-outline" color='white' />}
                            style={{paddingVertical: 20, borderWidth: 1, borderColor: 'white', margin: 30}}
                        />
                        <List.Item
                            title="20 Times"
                            titleStyle={{color: 'white'}}
                            description="get 20% off"
                            descriptionStyle={{color: 'white'}}
                            //left={props => <List.Icon {...props} icon="gift-outline" color='white' />}
                            style={{paddingVertical: 20, borderWidth: 1, borderColor: 'white', margin: 30}}
                        />
                        <List.Item
                            title="20 Times"
                            titleStyle={{color: 'white'}}
                            description="get 20% off"
                            descriptionStyle={{color: 'white'}}
                            //left={props => <List.Icon {...props} icon="gift-outline" color='white' />}
                            style={{paddingVertical: 20, borderWidth: 1, borderColor: 'white', margin: 30}}
                        />               
                    </ScrollView>

                    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                        <View style={styles.inner}>
                            <View style={{marginBottom: 20}}>
                                <TouchableOpacity onPress={ () => {this.showLogout()}}>
                                    <Logo />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height:0 }}>
                                <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} />
                                <ConfirmLogout isVisible={this.state.isLogoutVisible} text={this.state.logoutText} done={this.logoutDone} cancel={this.hideLogout} />
                            </View>
                            <View>
                                <Input containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Phone Number:"}
                                    placeholder={"(512) 123-4567"} inputStyle={{color:'white', marginLeft: 5}}
                                    inputContainerStyle={{borderColor: 'white'}}
                                    clearButtonMode="while-editing"
                                    leftIcon={<Icon name={"phone"} size={24} color='white' />}
                                    value={this.state.phoneNumber} editable={false}
                                    errorMessage={!this.state.isValidPhoneNumber ? "The field \"Phone Number\" must be a valid phone number." : ""} />    
                                <VirtualKeyboard onPress={(text) => {this.onPhoneChange(text)}} lemmein={this.lemmeIn} />                                 
                            </View>
                        </View>
                    </ScrollView>        
                </ScrollView>             
            </LinearGradient>
        );
    }      
}