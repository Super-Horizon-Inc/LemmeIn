import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home.js';
import CustomerScreen from './screens/Customer.js';

const SwitchNavigator = createSwitchNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        },
        CustomerScreen: {
            screen: CustomerScreen
        }
    },
    {
        initialRouteName: "HomeScreen"
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

