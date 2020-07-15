import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { DataTable } from 'react-native-paper'; 
import CustomerInformation from './CustomerInformation.js';
import Confirm from './Confirm.js';
import Logo from './Logo.js';
import { LinearGradient } from 'expo-linear-gradient';


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

export default class CustomerList extends Component {

    constructor (props) {

        super(props);        

        const customerList = this.props.navigation.state.params.customerList;

        this.state = {
            customer: null,
            isCustInfoVisible: false,
            isConfirmVisible: false,           
            confirmText: "",
            orientation: this.isPortrait() ? "portrait" : "landscape",
            customersOriginal: customerList,
            customers: customerList.slice(0,customerList.length <= 5 ? customerList.length : 5),
            pageNumber: 0,
            pageFrom: 1,
            pageTo: customerList.length > 5 ? 5 : customerList.length,
           
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

        const pageFrom = pageNumber*5 + 1;

        const sliceFrom = pageFrom == 1 ? 0 : pageFrom - 1;
        
        this.setState({
            pageFrom: pageFrom,
            pageNumber: pageNumber,
            customers: this.state.customersOriginal.slice(sliceFrom, this.state.customersOriginal.length <= sliceFrom + 5 ? this.state.customersOriginal.length : sliceFrom + 5)
        });

        const to = (this.state.customersOriginal.length - (pageNumber * 5)) > 5 ? (pageNumber+1) * 5 : this.state.customersOriginal.length;
        this.setState({                 
            pageTo: to,
        });

    }

    render() {

        return (
            <LinearGradient colors={['#8ABAD3FF', '#FCF6F5FF', '#FCF6F5FF', '#FCF6F5FF', '#8ABAD3FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <SafeAreaView style={{flex:1,marginTop: 50}}>
                    <Logo/>

                    <View style={{alignItems: 'center', paddingBottom: 10}}>
                        {this.props.navigation.state.params.selectedIndex == 0 ? 
                            <Text style={{fontWeight:'bold'}}>Entered Phone Number: {this.state.customers[0].phoneNumber}</Text> :
                            <Text style={{fontWeight:'bold'}}>Entered Email: {this.state.customers[0].email}</Text>
                        }
                        <Text style={{fontWeight:'bold'}}>Who are you?</Text>
                    </View>

                    <View style={{height:0}}>
                        {this.state.isConfirmVisible ? <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} /> : <View></View> }               
                        {this.state.isCustInfoVisible ? <CustomerInformation isVisible={this.state.isCustInfoVisible} customer={this.state.customer} 
                                                                    hideModal={this.hideModal} done={this.done} /> : <View></View> }             
                    </View>
                    <ScrollView directionalLockEnabled={false} horizontal={true} 
                            showsHorizontalScrollIndicator={false} bounces={false} style={{flex:1}}>
                        <DataTable style={{width: Dimensions.get("screen").width}}>
                            <DataTable.Pagination style={this.state.orientation == 'portrait' ? portraitStyles.pagination : landscapeStyles.pagination}
                                page={this.state.pageNumber}
                                numberOfPages={Math.ceil(this.state.customersOriginal.length / 5)}
                                onPageChange={page => this.onPageChange(page)}
                                label={`${this.state.pageFrom}-${this.state.pageTo} of ${this.state.customersOriginal.length}`}
                            />
                            
                            <DataTable.Header>
                                <DataTable.Title>First Name</DataTable.Title>
                                <DataTable.Title>Last Name</DataTable.Title>
                            </DataTable.Header>

                            <Customers customers={this.state.customers} onSelect={this.onSelect} />
                        </DataTable>
                    </ScrollView>
                    <View>
                        <Button title="None" type="solid" onPress={this.cancel} style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '5%' }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}