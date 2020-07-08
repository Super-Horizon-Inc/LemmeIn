import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Button } from 'react-native';
import { DataTable } from 'react-native-paper'; 
import CustomerInformation from './CustomerInformation.js';
import Logo from './Logo.js';


class Customers extends Component {
  
    constructor(props) {

        super(props);

    }

    render () {
        
        return (
            this.props.customers.map(customer => {
                return (
                    <DataTable.Row onPress={() => { this.props.onSelect(customer) }} style={{ width: 400 }}>
                        <DataTable.Cell>{customer.firstName}</DataTable.Cell>
                        <DataTable.Cell>{customer.lastName}</DataTable.Cell>
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
            isVisible: false,
            customer: null,
        }

        this.onSelect = this.onSelect.bind(this);
        
    }

    cancel = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    showModal () {
        this.setState({ isVisible: true });
    }

    hideModal () {
        this.setState({ isVisible: false });
    }

    onSelect = (customer) => {
     
        this.setState({customer: customer});
        this.showModal();       
    }

    render() {

        return (
            <SafeAreaView style={{flex:1}}>
                <Logo/>
                <CustomerInformation isVisible={this.state.isVisible} customer={this.state.customer} />
                <ScrollView directionalLockEnabled={false} horizontal={true} 
                            showsHorizontalScrollIndicator={false} bounces={false} style={{flex:1}}> 
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>                        
                            <DataTable>                            
                                    <View>
                                        <DataTable.Header style={{ width: 400 }} >
                                            <DataTable.Title>First Name</DataTable.Title>
                                            <DataTable.Title>Last Name</DataTable.Title>
                                        </DataTable.Header>
                                    </View>
                                    <View>
                                        <Customers customers={this.props.navigation.state.params.customerList}
                                                    onSelect={this.onSelect} />
                                    </View>                                                                      
                            </DataTable>
                        </View>
                    </ScrollView>
                </ScrollView>
                <View style={{ flexDirection:"row", padding: 15}}>
                    <Button title="None" type="solid" onPress={this.cancel} style={{width: "60%", paddingLeft: "5%", backgroundColor: "blue"}} />
                </View>
            </SafeAreaView>
        )
    }
}