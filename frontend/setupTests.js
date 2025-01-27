import '@testing-library/jest-native/extend-expect';

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            API_URL: 'http://mock-api-url.com'
        }
    }
}));

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
// hides console.warn and console.error messages in the test output