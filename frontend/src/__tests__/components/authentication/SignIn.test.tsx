import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import SignIn from "../../../components/authentication/SignIn";
import { MemoryRouter } from 'react-router-native';

describe('User sign in interaction', () => {
    it('calls onSignIn with correct credentials when valid', async () => {
        const mockOnSignIn = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignIn onSignIn={mockOnSignIn}></SignIn>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockOnSignIn).toHaveBeenCalledTimes(1);
            expect(mockOnSignIn).toHaveBeenCalledWith('testuser', 'password123');
        });
    }, 10000);

    it('does not call onSignIn with empty username', async () => {
        const mockOnSignIn = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignIn onSignIn={mockOnSignIn}></SignIn>
            </MemoryRouter>
        );
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockOnSignIn).not.toHaveBeenCalled();
        });
    }, 10000);

    it('does not call onSignIn with empty password', async () => {
        const mockOnSignIn = jest.fn();
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignIn onSignIn={mockOnSignIn}></SignIn>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const loginButton = screen.getByText('Log In');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockOnSignIn).not.toHaveBeenCalled();
        });
    }, 10000);

    it('shows error message with invalid credentials', async () => {
        const mockOnSignIn = jest.fn(() => { throw new Error('Invalid credentials'); });
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignIn onSignIn={mockOnSignIn}></SignIn>
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.changeText(usernameInput, 'invaliduser');
        fireEvent.changeText(passwordInput, 'invalidpassword');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockOnSignIn).toHaveBeenCalledTimes(1);
            expect(mockOnSignIn).toHaveBeenCalledWith('invaliduser', 'invalidpassword');
            expect(screen.getByText('An unexpected error occurred.')).toBeTruthy();
        });
    }, 10000);
});
