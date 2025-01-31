import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileView from '../../components/ProfileView';
import userService from '../../services/users';
import { MemoryRouter, Route, Routes } from 'react-router-native';
import { useNavigate } from 'react-router-native';

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
        fireEvent.press(getByText('Log out'));
        expect(onLogoutMock).toHaveBeenCalled();
    });

    it('should update avatar when an avatar is selected', async () => {
        const { getByText, getByTestId } = renderComponent();
        await waitFor(() => getByText('testuser'));
        const avatar2 = getByTestId('avatar-avatar2'); 
        fireEvent.press(avatar2);
        await waitFor(() => expect(userService.updateAvatar).toHaveBeenCalledWith('1', 'avatar2'));
    });

    it('should navigate back when back arrow button is pressed', async () => {
        const { getByText } = renderComponent();
        await waitFor(() => getByText('testuser'));
        fireEvent.press(getByText('<'));
        expect(navigateMock).toHaveBeenCalledWith('/users/1/lessons');
    });
});