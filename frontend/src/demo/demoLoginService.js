import demoData from '../demo/demoData.json';

/**
 * Authenticates a user with the provided credentials.
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Object} - An object containing a token and the user data.
 * @throws {Error} - If the username or password is invalid.
 */
const login = async (credentials) => {
    const user = demoData.users.find(user => user.username === credentials.username && user.password === credentials.password);
    if (!user) throw new Error('Invalid username or password');
    return { token: 'demo-token', user };
};

export default { login };