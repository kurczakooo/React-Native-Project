import { User } from 'src/types';
import { api } from './config';

/**
 * Authenticate with username and password
 * @param user username
 * @param password password
 * @returns id of user or null if no such exists
 */
export const authenticate = async (user: string, password: string): Promise<string | null> => {
    const users: User[] = (await api.get(`/users?username=${user}&password=${password}`)).data;
    console.log(users);
    if (users.length === 0) {
        return null;
    } else {
        return users[0].id;
    }
};
