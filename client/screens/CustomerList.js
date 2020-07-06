import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper'; 
import { Button } from 'react-native-elements';

function ShowCustomers(props) {

    //const isPhoneNumber = props.selectedIndex == 0 ? true : false;

        return(
            props.customers.map(customer => {
                return (
                    <DataTable.Row>
                        <DataTable.Cell>{customer.firstName}</DataTable.Cell>
                        <DataTable.Cell>{customer.lastName}</DataTable.Cell>
                        <DataTable.Cell>{props.selectedIndex == 0 ? customer.phoneNumber : customer.email}</DataTable.Cell>                  
                        <DataTable.Cell>{customer.visitCounter}</DataTable.Cell>
                    </DataTable.Row>
                )
            })
        )          
         
}

function ShowHeader(props) {

    //const isPhoneNumber = props.selectedIndex == 0 ? true : false;

        return (
            <DataTable.Header style = {{ marginTop: 100 }}>
                <DataTable.Title>First Name</DataTable.Title>
                <DataTable.Title>Last Name</DataTable.Title>
                <DataTable.Title>{props.selectedIndex == 0 ? 'Phone Number' : 'Email'}</DataTable.Title>
                <DataTable.Title>Visited Times</DataTable.Title>
            </DataTable.Header>
        )
}

export default class CustomerList extends Component {

    constructor (props) {

        super(props);

        //const customerList = this.props.navigation.state.params.customerList;
        //const selectedIndex = this.props.navigation.state.params.selectedIndex;

        //const isPhoneNumber = this.props.navigation.state.params.selectedIndex == 0 ? true : false;


    }

    submit = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    render() {

        return (

            <DataTable>
                <View>
                    <ShowHeader selectedIndex = {this.props.navigation.state.params.selectedIndex} />
                </View>
                <View>
                    <ShowCustomers customers = {this.props.navigation.state.params.customerList}
                                    selectedIndex = {this.props.navigation.state.params.selectedIndex} />

                </View>                

                <View >
                    <Button title="Done" type="solid" onPress={this.submit} />
                </View>
            </DataTable>
        )
    }
}