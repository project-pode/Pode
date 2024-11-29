import  { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from "../../components/SignIn";
import { MemoryRouter } from 'react-router-native';

describe('User sign in interaction', () => {
    it('calls onSignIn with correct credentials when valid', async () => {
        const mockOnSignIn = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <SignIn onSignIn={mockOnSignIn}></SignIn>
            </MemoryRouter>
        );
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Log In');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockOnSignIn).toHaveBeenCalledTimes(1);
            expect(mockOnSignIn).toHaveBeenCalledWith('testuser', 'password123');
        });
    });
});