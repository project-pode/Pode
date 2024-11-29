import  { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../../components/SignUp';
import { MemoryRouter } from 'react-router-native';

describe('User sign up interaction', () => {
    it('calls onSignUp with valid inputs', async () => {
        const mockOnSignUp = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <SignUp onSignUp={mockOnSignUp}></SignUp>
            </MemoryRouter>
        );
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const passwordConfirmationInput = getByPlaceholderText('Password confirmation');
        const registerButton = getByText('Register');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmationInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).toHaveBeenCalledTimes(1);
            expect(mockOnSignUp).toHaveBeenCalledWith('testuser', 'password123', 'password123');
        });
    });
});