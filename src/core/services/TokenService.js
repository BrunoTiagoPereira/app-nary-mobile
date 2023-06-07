import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

const SaveToken = async (token) => {
    await SecureStore.setItemAsync('token',token);
}

const getToken = async () => {
  return await SecureStore.getItemAsync('token');
}

const getDecodedToken = (token) => {
    if(token){
        return jwt_decode(token);
    }
    return null;
}

const clearToken = async () => {
    await SecureStore.deleteItemAsync('token');
}

const isTokenValid = (token) => {
    if(token){
        const decodedToken = jwt_decode(token);
      
        const currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            return false;
        } else {
            return true;
        }
    }

    return false;
}

export {SaveToken, isTokenValid, getDecodedToken, getToken, clearToken}