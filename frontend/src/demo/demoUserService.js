import demoData from '../demo/demoData.json';

const demoUserService = {
    getOne: async (userId) => {
        return demoData.users.find(user => user.id === userId);
    },
    updateAvatar: async (userId, avatar) => {
        const user = demoData.users.find(user => user.id === userId);
        if (user) {
            user.avatar = avatar;
        }
        return user;
    }
};

export default demoUserService;