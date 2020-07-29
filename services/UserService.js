import AuthHeader from './AuthHeader.js';

export default class UserService {

    constructor() {
        
    }

    showOrAddCustomer = async (input) => {
        
        let header = await AuthHeader();

        return await fetch('https://31df3a354fd7.ngrok.io/lemme/customers', {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': header.Authorization
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {console.error(error)});

    }

    sendEmailCustomer = async (input) => {

        let header = await AuthHeader();

        return await fetch('https://31df3a354fd7.ngrok.io/lemme/customers/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization': header.Authorization
                },
                body: JSON.stringify(input)
            })
            .then(response => response.text())
            .then(text => {return text})
            .catch(error => {console.error(error)});
    }

}