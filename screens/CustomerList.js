import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { DataTable } from 'react-native-paper'; 
import CustomerInformation from './CustomerInformation.js';
import Confirm from './Confirm.js';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from '../services/UserService.js';


class Customers extends Component {
  
    constructor(props) {       
        super(props);
    }

    render () {       
        return (
            this.props.customers.map(customer => {
                return (
                    <DataTable.Row key={customer.id} onPress={() => { this.props.onSelect(customer)}}>
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
            pageFrom: customerList.length > 0 ? 1 : 0,
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
        
        setTimeout( async () => {

            this.setState({isConfirmVisible: true, confirmText: "Please wait ... \nWe are sending email to:\n" + this.state.customer.email});

            try {
                let responseTextEmail = await new UserService().sendEmailCustomer({id:this.state.customer.id, email:this.state.customer.email});

                this.setState({confirmText: responseTextEmail});

                setTimeout(() => {
                            this.setState({isConfirmVisible: false, confirmText: ""});
                            this.props.navigation.navigate('HomeScreen');
                        }, 2000); 
            }
            catch(error) {
                this.setState({
                    isConfirmVisible: true,                
                    confirmText: "Sorry! Something went wrong."
                });
                setTimeout(() => {
                    this.setState({
                        isConfirmVisible: false, 
                        confirmText: ""
                    });
                }, 5000);
                //console.log(error);
            }

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
        if (this.state.customersOriginal.length > 0) {
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

    }

    render() {

        return (
            <LinearGradient colors={['#05346E', '#2B93C1', '#82B7A8']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <SafeAreaView style={{flex:1,marginTop: 100}}>
                    <View style={{alignItems: 'center', paddingBottom: 10}}>
                        <Text style={{fontWeight:'bold', color:'white'}}>Entered Phone Number: {this.state.customers[0].phoneNumber}</Text>    
                        <Text style={{fontWeight:'bold', color:'white'}}>Pick your name</Text>
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
                        <Button title="None" buttonStyle={{backgroundColor:'#376363FF'}} onPress={this.cancel} style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '5%', marginBottom: '20%' }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}