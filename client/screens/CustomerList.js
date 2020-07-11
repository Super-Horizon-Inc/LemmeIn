import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
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
                    <DataTable.Row onPress={() => { this.props.onSelect(customer)}} style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                        <DataTable.Cell style={{width: 50, backgroundColor:'blue'}}>{customer.firstName}</DataTable.Cell>
                        <DataTable.Cell style={{width:50,}}>{customer.lastName}</DataTable.Cell>
                    </DataTable.Row>
                )
            })
        ) 
    }         
         
}

// function ShowPagination(props) {
    
//     const rowsPerPage = 5;
//     // const rows = [ { key: 1, name: 'Page 1' },
//     //                 { key: 2, name: 'Page 2' },
//     //                 { key: 3, name: 'Page 3' } ];
    
//     const [page, setPage] = React.useState(0);

//     const endOfPage = ((page + 1) * rowsPerPage);
//     const numberOfCustomer = props.customers.length;
//     const from = page * rowsPerPage;
//     const to = endOfPage <= numberOfCustomer ? endOfPage : numberOfCustomer;
  
//     return (
//         <DataTable.Pagination
//           page={page}
//           numberOfPages={Math.ceil(numberOfCustomer / rowsPerPage)}
//           onPageChange={page => setPage(page)}
//           label={`${from + 1}-${to} of ${numberOfCustomer}`}
          
//         />
//     );
// };

export default class CustomerList extends Component {

    constructor (props) {

        super(props);

        this.state = {
            customer: null,
            isCustInfoVisible: false,
            isConfirmVisible: false,           
            confirmText: "",
        }

    }

    done = () => {

        this.hideModal();
        setTimeout(() => {
            this.setState({isConfirmVisible: true, confirmText: "Please wait ... \nWe are sending email to:\n" + this.state.customer.email});
        
            fetch('https://b208748da9fd.ngrok.io/lemmein/customers/email', {
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

    cancel = () => {
        this.props.navigation.navigate('HomeScreen');
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

    render() {

        return (
            <SafeAreaView style={{flex:1}}>
                <Logo />
                <View style={{alignItems: "center", paddingBottom: 10}}>
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
                <ScrollView directionalLockEnabled={false} horizontal={true} 
                            showsHorizontalScrollIndicator={false} bounces={false} style={{flex:1}}> 
                    <View>
                        <View>
                            <DataTable.Header>
                                <DataTable.Title>First Name</DataTable.Title>
                                <DataTable.Title>Last Name</DataTable.Title>
                            </DataTable.Header>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>                        
                                <DataTable>                                                               
                                        <View>
                                            <Customers customers={this.props.navigation.state.params.customerList}
                                                        onSelect={this.onSelect} />
                                        </View>                                                                      
                                </DataTable>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
                <View>
                    <Button title="None" type="solid" onPress={this.cancel} style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '5%' }} />
                </View>
            </SafeAreaView>
        )
    }
}