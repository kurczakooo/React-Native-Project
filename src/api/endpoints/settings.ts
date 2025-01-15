import axios from 'axios';
import { api } from '../config';

export class InvalidPasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPasswordError';
    }
}

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
    const user = await api.get(`/users/?id=${userId}`);

    if (user.data.length === 0) {
        throw Error('No such account found');
    }

    if (user.data[0].password !== password) {
        throw new InvalidPasswordError('Incorrect password');
    }

    // console.log(user.data);
    return api
        .patch(`/users/${userId}`, {
            // ...user,
            password: newPassword
        })
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error('Failed to change passwword');
            }
        });
};

export const changeUsername = async (userId: string, newUsername: string) => {
    if (userId === '') {
        throw new Error('Invalid user');
    }
    return api.patch(`/users/${userId}`, { username: newUsername });
};
