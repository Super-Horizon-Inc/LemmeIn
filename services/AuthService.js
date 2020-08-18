import { AsyncStorage } from 'react-native';

export default class AuthService {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    getCurrentUsername = async () => {
        return await AsyncStorage.getItem('username');
    }

    signin = () => {
        const result = fetch("https://d0088e166c80.ngrok.io/lemme/user/auth/signin", {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json'              
            },
            body: JSON.stringify({username: this.username, password: this.password})
            })
            .then(response => 
                response.json()
            )
            .then(json => {

                if (json.accessToken != null) {
                    AsyncStorage.setItem('user', json.accessToken);     
                    AsyncStorage.setItem('username', this.username);
                }
                return json;
                
            })
            .catch(error => {                   
                console.error(error);
            });

        return result;
    }


    logout = async (input) => {
        return await fetch("https://d0088e166c80.ngrok.io/lemme/user/auth/logout", {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(input)
            })
            .then(response => 
                response.json()
            )
            .then( json => {
                if (json.message.indexOf('Logout successfully.') >= 0) {
                    AsyncStorage.removeItem('user');
                    AsyncStorage.removeItem('username');   
                }            
                return json.message; 
            })
            .catch(error => {                   
                console.error(error);
            });
    }

}