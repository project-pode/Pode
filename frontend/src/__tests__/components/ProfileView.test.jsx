import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileView from '../../components/ProfileView';
import userService from '../../services/users';
import { MemoryRouter, Route, Routes } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import theme from '../../themes/ProfileViewTheme';
                                                                                                                                                        
jest.mock('../../services/users');
jest.mock('react-router-native', () => ({
    ...jest.requireActual('react-router-native'),
    useNavigate: jest.fn(),
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
    const navigateMock = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(navigateMock);
    });

    const renderComponent = () => {
        return render(
            <MemoryRouter initialEntries={['/users/1/profile']}>
                <Routes>
                    <Route path="/users/:userId/profile" element={<ProfileView onLogout={onLogoutMock} />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render user information after loading', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => expect(getByText('testuser')).toBeTruthy());
    });

    it('should call onLogout when logout button is pressed', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Log out'));
        expect(onLogoutMock).toHaveBeenCalled();
    });

    it('should open modal when "Change profile picture" button is pressed', async () => {
        const { getByText, getByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Change profile picture'));
        expect(getByTestId('modal-close-button')).toBeTruthy();
    });
    
    it('should close modal when close button is pressed', async () => {
        const { getByText, getByTestId, queryByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Change profile picture'));
        fireEvent.press(getByTestId('modal-close-button'));
        await waitFor(() => expect(queryByTestId('modal-close-button')).toBeNull());
    });
    
    it('should display avatars in modal', async () => {
        const { getByText, getByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Change profile picture'));
        await waitFor(() => {
            expect(getByTestId('avatar-avatar1')).toBeTruthy();
        });
    });

    it('should update avatar when a new avatar is selected', async () => {
        const { getByText, getByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('Change profile picture'));
        expect(getByTestId('modal-close-button')).toBeTruthy();
        await waitFor(() => getByTestId('avatar-avatar2')); //the avatar to select
        fireEvent.press(getByTestId('avatar-avatar2'));
        await waitFor(() => expect(userService.updateAvatar).toHaveBeenCalledWith('1', 'avatar2'));
        expect(getByTestId('avatar')).toHaveStyle(theme.selectedAvatar); //the profile pic avatar
    });

    it('should navigate back when back arrow button is pressed', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('<'));
        expect(navigateMock).toHaveBeenCalledWith('/users/1/lessons');
    });
});