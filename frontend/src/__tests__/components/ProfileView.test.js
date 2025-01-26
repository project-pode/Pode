import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileView from '../../components/ProfileView';
import userService from '../../services/users';
import { MemoryRouter, Route, Routes } from 'react-router-native';

jest.mock('../../services/users');

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            API_URL: 'http://mock-api-url.com'
        }
    }
}));

const mockUser = {
    id: '1',
    username: 'testuser',
    avatar: 'avatar1',
};

userService.getOne.mockResolvedValue(mockUser);
userService.updateAvatar.mockResolvedValue({});

describe('ProfileView', () => {
    const onLogoutMock = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter initialEntries={['/profile/1']}>
                <Routes>
                    <Route path="/profile/:userId" element={<ProfileView onLogout={onLogoutMock} />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render loading state initially', () => {
        const { getByText } = renderComponent();
        expect(getByText('Loading...')).toBeTruthy();
    });

    it('should render user information after loading', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => expect(getByText('testuser')).toBeTruthy());
    });

    it('should call onLogout when logout button is pressed', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Logout'));
        expect(onLogoutMock).toHaveBeenCalled();
    });

    it('should update avatar when an avatar is selected and update button is pressed', async () => {
        const { getByText, getByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        const avatar2 = getByTestId('avatar-avatar2');
        fireEvent.press(avatar2); // Select second avatar
        fireEvent.press(getByText('Update avatar'));
        await waitFor(() => expect(userService.updateAvatar).toHaveBeenCalledWith('1', 'avatar2'));
    });

    it('should navigate back when go back button is pressed', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Go back'));
        // Add your navigation assertion here
    });
});