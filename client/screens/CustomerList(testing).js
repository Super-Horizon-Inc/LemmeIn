import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { DataTable } from 'react-native-paper'; 
import CustomerInformation from './CustomerInformation.js';
import Confirm from './Confirm.js';
import Logo from './Logo.js';

class Customers extends Component {
  
    constructor(props) {
        
        super(props);

    }

    render () {       
        return (
            this.props.customers.map(customer => {
                return (
                    <DataTable.Row onPress={() => { this.props.onSelect(customer)}}>
                        <DataTable.Cell>{customer.firstName}</DataTable.Cell>
                        <DataTable.Cell>{customer.lastName}</DataTable.Cell>
                    </DataTable.Row>
                )
            })
        ) 
    }                  
}

const portraitStyles = StyleSheet.create({
    pagination: {
        marginRight: 0
    }
})

const landscapeStyles = StyleSheet.create({
    pagination: {
        marginRight: 100
    }
})

function ShowPagination(props) {
    
    //const rowsPerPage = 5;
    
    const [page, setPage] = React.useState(0);

    //const endOfPage = ((page + 1) * rowsPerPage);
    //const numberOfCustomer = props.customers.length;
    //const from = page * rowsPerPage;
    //const to = endOfPage <= numberOfCustomer ? endOfPage : numberOfCustomer;

    console.log(page);
  
    return (
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(numberOfCustomer / rowsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${numberOfCustomer}`}         
        />
    );
};

export default class CustomerList extends Component {

    constructor (props) {

        super(props);      
        
        const customers = this.props.navigation.state.params.customerList;
        const rowsPerPage = 5;

        this.state = {
            customer: null,
            isCustInfoVisible: false,
            isConfirmVisible: false,           
            confirmText: "",
            orientation: this.isPortrait() ? "portrait" : "landscape",
            page: 0,
            from: page * rowsPerPage,
            to: ((page + 1) * rowsPerPage) <= numberOfCustomer ? ((page + 1) * rowsPerPage) : customers.length,
            customerSlice = customers.slice(this.state.from, this.state.to),
        }

        Dimensions.addEventListener("change", () => {
            this.setState({
                orientation: this.isPortrait() ? "portrait" : "landscape"
            });
        });

    }

    done = () => {

        this.hideModal();

        setTimeout(() => {

            this.setState({isConfirmVisible: true, confirmText: "Please wait ... \nWe are sending email to:\n" + this.state.customer.email});
        
            fetch('https://d7ec0e5e121e.ngrok.io/lemmein/customers/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({id:this.state.customer.id, email:this.state.customer.email})
            })
            .then(response => 
                response.text()
            )
            .then(json => {

                this.setState({confirmText: json});

                setTimeout(() => {
                    this.setState({isConfirmVisible: false, confirmText: ""});
                    this.props.navigation.navigate('HomeScreen');
                }, 2000);    
            })
            .catch(error => {
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
                console.error(error);
            });
        }, 0);
     
    }

    isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width;
    };

    cancel = () => {
        this.props.navigation.navigate("HomeScreen");
    }

    showModal = () => {
        this.setState({ isCustInfoVisible: true });
    }

    hideModal = () => {
        this.setState({ isCustInfoVisible: false });
 
    }

    onSelect = (customer) => {
     
        this.setState({customer: customer});
        this.showModal();
    }

    onPageChange = (pageNumber) => {

    }

    render() {

        return (
            <SafeAreaView style={{flex:1,marginTop: 50}}>
                <Logo/>

                <View style={{alignItems: 'center', paddingBottom: 10}}>
                    {this.props.navigation.state.params.selectedIndex == 0 ? 
                        <Text style={{fontWeight:'bold'}}>Entered Phone Number: {this.props.navigation.state.params.customerList[0].phoneNumber}</Text> :
                        <Text style={{fontWeight:'bold'}}>Entered Email: {this.props.navigation.state.params.customerList[0].email}</Text>
                    }
                    <Text style={{fontWeight:'bold'}}>Who are you?</Text>
                </View>

                <View style={{height:0}}>
                    {this.state.isConfirmVisible ? <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} /> : <View></View> }               
                    {this.state.isCustInfoVisible ? <CustomerInformation isVisible={this.state.isCustInfoVisible} customer={this.state.customer} 
                                                                hideModal={this.hideModal} done={this.done} /> : <View></View> }             
                </View>
                
                    <DataTable style={{width: Dimensions.get("screen").width}}>
                        <ShowPagination customers={this.props.navigation.state.params.customerList} />
                        <DataTable.Header>
                            <DataTable.Title>First Name</DataTable.Title>
                            <DataTable.Title>Last Name</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Customers customers={this.props.navigation.state.params.customerList} onSelect={this.onSelect} />
                        </ScrollView>
                    </DataTable>

                <View>
                    <Button title="None" type="solid" onPress={this.cancel} style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '5%' }} />
                </View>
            </SafeAreaView>
        )
    }
}