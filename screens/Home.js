import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform , TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';
import ConfirmLogout from './ConfirmLogout.js';
import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from '../services/UserService.js';
import AuthService from '../services/AuthService.js';


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
    buttonContainer:{
        marginTop: '50%',
        color: 'white',
        width: '85%',
        position: 'absolute',
    }
});

export default class Home extends ValidationComponent {

    constructor(props) {

        super(props);

        this.authService = new AuthService();

        this.state = {
            selectedIndex: 0,
            email: "",
            phone: "",
            isValidPhoneNumber: true,
            isConfirmVisible: false,
            confirmText: "",
            isLogoutVisible: false,
            logoutText: ""
            
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

    async lemmeIn () {

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
      
        setTimeout( async () => {

            if (!this.isFieldInError("email") && this.state.isValidPhoneNumber) {

                const isPhoneNumber = this.state.selectedIndex == 0 ? true : false;

                let phoneNumber = "";
                if (isPhoneNumber) {
                    phoneNumber = this.state.phone.split('+1 ')[0] != this.state.phone ? this.state.phone.split('+1 ')[1] : this.state.phone;
                }

                const confirmSubtext = isPhoneNumber ? "phone number: " + this.state.phone : "email: " + this.state.email;

                this.setState({
                    isConfirmVisible: true, 
                    confirmText: "Please wait ... \nWe are looking for your " + confirmSubtext + " in our database."
                });

                let userService = new UserService();
                const username = await this.authService.getCurrentUsername();
                
                try {
                    let customers = isPhoneNumber
                    ? await userService.showOrAddCustomer({phoneNumber:phoneNumber, username:username})
                    : await userService.showOrAddCustomer({email:this.state.email.toLowerCase(), username:username});
        
                        if (customers[0].isNew) {       
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
                            }, 3000);    
                    }
                    else {    
                        this.props.navigation.navigate("CustomerListScreen", {customerList: customers, selectedIndex: this.state.selectedIndex});   
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
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
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
                                <ConfirmLogout isVisible={this.state.isLogoutVisible} text={this.state.logoutText} done={this.logoutDone} cancel={this.hideLogout} />
                            </View>

                            <TouchableOpacity onPress={ () => {this.showLogout()}}>
                                <Logo />
                            </TouchableOpacity>

                            <View>
                                <View>
                                    <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex} selectedButtonStyle={{backgroundColor:'#376363FF', color: 'white'}}
                                                buttons={["Phone Number", "Email Address"]} containerStyle={{height: 100, borderColor: '#6f6d6dFF'}} />
                                    
                                    {this.state.selectedIndex == 1 
                                        ?
                                            <Input ref="email" containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Email Address"}
                                                placeholder={"email@address.com"} inputStyle={{color:'white'}}
                                                leftIcon={<Icon name={"envelope"} size={24} color='white' />}
                                                keyboardType={"email-address"}
                                                onChangeText={ text => this.setState({email: text}) } 
                                                value={this.state.email}
                                                errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} />
                                        :
                                            <Input ref="phone" containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Phone Number"}
                                                placeholder={"(512) 123-4567"} inputStyle={{color:'white'}}
                                                leftIcon={<Icon name={"phone"} size={24} color='white' />}
                                                keyboardType={"phone-pad"} returnKeyType={"done"}
                                                onChangeText={ (text) => {this.onPhoneChange(text)} } 
                                                value={this.state.phone}
                                                errorMessage={!this.state.isValidPhoneNumber ? "The field \"phone\" must be a valid phone number." : ""} />
                                    }                         
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Button containerStyle={styles.buttonContainer} buttonStyle={{backgroundColor:'#376363FF'}} title="Lemme In" onPress={this.lemmeIn} />
                                </View>
                            </View>
                        </View>
                    
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }      
}