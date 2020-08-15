import React, {Component} from 'react';
import {View} from 'react-native';
import {Image} from 'react-native-elements';


export default class Logo extends Component {
    render () {
        return (
            <View style={{alignItems: 'center' }}>
                <Image source={require('../assets/lemme-in-logo.png')} style={{ width: 150, height: 150}}/>
            </View>
        );
    };
}