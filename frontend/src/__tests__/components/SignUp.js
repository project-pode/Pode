import  { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import SignUp from '../../components/SignUp';
import { MemoryRouter } from 'react-router-native';

describe('User sign up interaction', () => {
    it('calls onSignUp with valid inputs', async () => {
        const mockOnSignUp = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignUp onSignUp={mockOnSignUp}></SignUp>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
        const registerButton = screen.getByText('Register');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmationInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).toHaveBeenCalledTimes(1);
            expect(mockOnSignUp).toHaveBeenCalledWith('testuser', 'password123');
        });
    }, 10000);
});