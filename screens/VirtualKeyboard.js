import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
	container: {
        width:'100%'
	},
	row: {
		flexDirection: 'row',
	},
	backspace: {
        margin: 20
    },
    checked: {
        margin: 20
    },
	cell: {
		margin: 20,
		justifyContent: 'center',
	},
});

export default class VirtualKeyboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{this.Row([1, 2, 3])}
				{this.Row([4, 5, 6])}
				{this.Row([7, 8, 9])}
				<View style={styles.row}>
                    {this.backspace()}
					{this.Cell(0)}
                    {this.checked()}
				</View>
			</View>
		);
	}

	backspace() {
		return (
			<TouchableOpacity accessibilityLabel='backspace' style={styles.backspace} onPress={() => { this.onPress('back') }}>
				<Badge size={64} style={{backgroundColor:'white'}}>
                    <Icon name={"long-arrow-left"} size={23} color='#2B93C1' />       
                </Badge>           
			</TouchableOpacity>
		);
    }
    
    checked() {
        return (
            <TouchableOpacity accessibilityLabel='checked' style={styles.checked} 
                                onPress={() => { this.setState({text: ""});
                                                this.props.lemmein(); }}>
				<Badge size={64} style={{backgroundColor:'white'}}>
                    <Icon name={"check"} size={23} color='#2B93C1' />              
                </Badge>
			</TouchableOpacity>
		);
    }

	Row(numbersArray) {
		let cells = numbersArray.map((val) => this.Cell(val));
		return (
			<View style={styles.row}>{cells}</View>
		);
    }

	Cell(symbol) {       
		return (
			<TouchableOpacity style={styles.cell} key={symbol} accessibilityLabel={symbol.toString()} onPress={() => { this.onPress(symbol.toString()) }}>
                <Badge size={64} style={{color: '#2B93C1', backgroundColor:'white'}}>{symbol}</Badge>
			</TouchableOpacity>
		);
	}

	onPress(val) {
        let curText = this.state.text;
        if (isNaN(val)) {
            if (val === 'back') {
                curText = curText.slice(0, -1);
            } else {
                curText += val;
            }
        } else {
            curText += val;
        }
        this.setState({ text: curText });
        this.props.onPress(curText);
	}
}