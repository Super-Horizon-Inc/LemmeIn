import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthenticationScreen from './screens/Authentication.js';
import HomeScreen from './screens/Home.js';
//import CustomerScreen from './screens/Customer.js';
import CustomerListScreen from './screens/CustomerList.js';
import CustomerInformationScreen from './screens/CustomerInformation.js';

const SwitchNavigator = createSwitchNavigator(
    {
        AuthenticationScreen: {screen: AuthenticationScreen},
        HomeScreen: {screen: HomeScreen},
        // CustomerScreen: {screen: CustomerScreen},
        CustomerListScreen: {screen: CustomerListScreen},
        CustomerInformationScreen: {screen: CustomerInformationScreen}
    },
    {
        initialRouteName: "AuthenticationScreen"
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component {

    render() {
        return(
            <AppContainer></AppContainer>
        );
    };

}