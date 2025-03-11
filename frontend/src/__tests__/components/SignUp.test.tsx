import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import SignUp from '../../components/authentication/SignUp';
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

    it('does not call onSignUp with empty username', async () => {
        const mockOnSignUp = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignUp onSignUp={mockOnSignUp}></SignUp>
            </MemoryRouter>
        );
        const passwordInput = screen.getByPlaceholderText('Password');
        const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
        const registerButton = screen.getByText('Register');

        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmationInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).not.toHaveBeenCalled();
        });
    }, 10000);

    it('does not call onSignUp with empty password', async () => {
        const mockOnSignUp = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignUp onSignUp={mockOnSignUp}></SignUp>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
        const registerButton = screen.getByText('Register');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordConfirmationInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).not.toHaveBeenCalled();
        });
    }, 10000);

    it('does not call onSignUp with non-matching passwords', async () => {
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
        fireEvent.changeText(passwordConfirmationInput, 'password456');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).not.toHaveBeenCalled();
        });
    }, 10000);

    it('shows error message with invalid inputs', async () => {
        const mockOnSignUp = jest.fn(() => { throw new Error('Invalid inputs'); });
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignUp onSignUp={mockOnSignUp}></SignUp>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
        const registerButton = screen.getByText('Register');

        fireEvent.changeText(usernameInput, 'invaliduser');
        fireEvent.changeText(passwordInput, 'invalidpassword');
        fireEvent.changeText(passwordConfirmationInput, 'invalidpassword');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockOnSignUp).toHaveBeenCalledTimes(1);
            expect(mockOnSignUp).toHaveBeenCalledWith('invaliduser', 'invalidpassword');
            expect(screen.getByText('An unexpected error occurred.')).toBeTruthy();
        });
    }, 10000);
});