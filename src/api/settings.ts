import axios from 'axios';
import { api } from './config';

/**
 *
 * @param userId user id to opearte on
 * @param password current password
 * @param newPassword new password to be set
 * @returns true if chnaged password sucessfully, false otherwise
 */
export const changePassword = async (userId: string, password: string, newPassword: string) => {
    if (newPassword === '') {
        console.error('Tried to set empty password');
        return;
    }

    // console.log('----');
    const user = await api.get(`/users/?id=${userId}&password=${password}`);

    if (user.data.length === 0) {
        console.warn('No such account found');
        return false;
    } else {
        // console.log(user.data);
        const resp = await api.patch(`/users/${userId}`, {
            // ...user,
            password: newPassword
        });
        const status = resp.status;
        return status === 200;
    }
};
