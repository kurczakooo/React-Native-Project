import { User } from 'src/types';
import { api } from './config';
import * as SecureStore from 'expo-secure-store';

const credentialsStoreKey_c = 'Credentials';

export interface Credentials {
    username: string;
    password: string;
}

/**
 * Authenticate with username and password
 * @param user username
 * @param password password
 * @returns id of user or null if no such exists
 */
export const authenticate = async ({
    username: user,
    password: password
}: Credentials): Promise<string | null> => {
    const users: User[] = (await api.get(`/users?username=${user}&password=${password}`)).data;
    console.log(users);
    if (users.length === 0) {
        return null;
    } else {
        return users[0].id;
    }
};

/**
 * @brief Save credentials into save persistent store
 * @param credentials
 */
export const saveCredentials = (credentials: Credentials) => {
    SecureStore.setItem(credentialsStoreKey_c, JSON.stringify(credentials));
};

// @brief Read credentials from persistent store
export const getCredentials = () => {
    return JSON.parse(SecureStore.getItem(credentialsStoreKey_c) ?? '{}');
};
