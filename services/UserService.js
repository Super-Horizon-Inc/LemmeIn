import AuthHeader from './AuthHeader.js';

export default class UserService {

    constructor() {     
    }

    showOrAddCustomer = async (input) => {
        
        let header = await AuthHeader();

        return await fetch('https://d0088e166c80.ngrok.io/lemme/customers', {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': header.Authorization
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(json => {return json})
        .catch(error => {console.error(error)});

    }

    updateCustomer = async (customer) => {

        let header = await AuthHeader();

        return await fetch('https://d0088e166c80.ngrok.io/lemme/customers/update', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': header.Authorization
            },
            body: JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(json => {return json})
        .catch(error => {console.error(error)});

    }

}