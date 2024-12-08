import { User } from 'src/types';
import { backendAPI } from './config';

/**
 * Find
 * @param user username
 * @param password password
 */
export const onLogin = async (user: string, password: string) => {
    const users: User[] = (await backendAPI.get(`/users?username=${user}&password=${password}`))
        .data;
    console.log(users);
    if (users.length === 0) {
        return null;
    } else {
        return users[0].id;
    }
};
