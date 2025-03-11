import demoData from './demoData.json';

const demoUserService = {
    /**
     * Fetches a specific user by ID from the demo data.
     * @param {string} userId - The ID of the user.
     * @returns {Object} - The user object.
     */
    getOne: async (userId: string) => {
        return demoData.users.find(user => user.id === userId);
    },

    /**
     * Updates the avatar of a specific user in the demo data.
     * @param {string} userId - The ID of the user.
     * @param {string} avatar - The new avatar.
     * @returns {Object} - The updated user object.
     */
    updateAvatar: async (userId: string, avatar: string) => {
        const user = demoData.users.find(user => user.id === userId);
        if (user) {
            user.avatar = avatar;
        }
        return user;
    }
};

export default demoUserService;