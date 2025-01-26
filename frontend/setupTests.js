import '@testing-library/jest-native/extend-expect';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
// hides console.warn and console.error messages in the test output