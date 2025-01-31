import demoData from '../demo/demoData.json';

const login = async (credentials) => {
    const user = demoData.users.find(user => user.username === credentials.username && user.password === credentials.password);
    if (!user) throw new Error('Invalid username or password');
    return { token: 'demo-token', user };
};

export default { login };