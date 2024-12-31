import { api } from '../config';
import { User } from 'src/types';

/**
 * @brief Self explanatory
 */
export class UserAlreadyExsitsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

/**
 * @param username Username to check
 * @returns true if username is already occupied, false otherwise.
 */
const isUsernameOccupied = async (username: string) => {
    // Already exsiting users with the same name
    const alreadyExsitsingUser = await api.get(`/users?username=${username}`);
    console.log(alreadyExsitsingUser.data);
    return alreadyExsitsingUser.data.length !== 0;
};

/**
 * @param username Username of new user
 * @param password Password of new user
 * @throws UserAlreadyExistsError
 */
export const registerNewUser = async (username: string, password: string) => {
    if (await isUsernameOccupied(username)) {
        throw new UserAlreadyExsitsError(`User named ${username} already exists.`);
    }

    const response = await api.post('/users', {
        username,
        password
    });
    console.log('Registered');
};
