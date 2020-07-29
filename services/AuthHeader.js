import { AsyncStorage } from 'react-native';

export default async function AuthHeader() {
    
    const accessToken = await AsyncStorage.getItem('user');

    if(accessToken) {
        return {Authorization: 'Bearer ' + accessToken};
    }
    else {
        return {};
    }
}