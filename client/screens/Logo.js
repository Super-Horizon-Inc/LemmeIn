import React, {Component} from 'react';
import {View} from 'react-native';
import {Image} from 'react-native-elements';


export default class Logo extends Component {
    render () {
        return (
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/app-logo.png')} style={{ width: 200, height: 200 }}/>
            </View>
        );
    };
}