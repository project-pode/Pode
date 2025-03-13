import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../../hooks/useAuthStorage';
import ProgressMapView from '../../components/ProgressMapView';
import lessonService from '../../services/lessons';
import userService from '../../services/users';

jest.mock('../../services/lessons');
jest.mock('../../services/users');
jest.mock('../../hooks/useAuthStorage');
jest.mock('react-router-native', () => ({ 
    useNavigate: jest.fn(),
    useLocation: jest.fn(() => ({ search: '' })), // Add a default `search` value    
 }));

jest.mock('@expo/vector-icons/MaterialIcons', () => 'Icon');

jest.mock('query-string', () => ({
  parse: jest.fn(() => ({showPopup: 'false'})),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

const mockAuthStorage = {
  getUser: jest.fn(),
};
(useAuthStorage as jest.Mock).mockReturnValue(mockAuthStorage);

describe('ProgressMapView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading view while fetching data', async () => {
    mockAuthStorage.getUser.mockResolvedValue(null);
    const { getByTestId } = render(<ProgressMapView />);
    expect(getByTestId('test')).toBeTruthy();
  });

  it('fetches and displays lessons', async () => {
    mockAuthStorage.getUser.mockResolvedValue({ id: '1' });
    userService.getOne.mockResolvedValue({ id: '1', avatar: 'avatar1', completedLessons: [] });
    lessonService.getLessons.mockResolvedValue([{ id: 'lesson1', title: 'Lesson 1' }]);

    const { getByText } = render(<ProgressMapView />);
    await waitFor(() => expect(getByText('Lesson 1')).toBeTruthy());
  });

  it('navigates to the selected lesson', async () => {
    mockAuthStorage.getUser.mockResolvedValue({ id: '1' });
    userService.getOne.mockResolvedValue({ id: '1', avatar: 'avatar1', completedLessons: [] });
    lessonService.getLessons.mockResolvedValue([{ id: 'lesson1', title: 'Lesson 1' }]);

    const { getByText } = render(<ProgressMapView />);
    await waitFor(() => expect(getByText('Lesson 1')).toBeTruthy());
    fireEvent.press(getByText('Lesson 1'));
    fireEvent.press(getByText('Start'));
    expect(mockNavigate).toHaveBeenCalledWith('/lessons/lesson1');
  });

  it('shows and hides the popup', async () => {
    mockAuthStorage.getUser.mockResolvedValue({ id: '1' });
    userService.getOne.mockResolvedValue({ id: '1', avatar: 'avatar1', completedLessons: [] });
    lessonService.getLessons.mockResolvedValue([]);

    const { getByTestId, getByText } = render(<ProgressMapView />);
    await waitFor(() => expect(getByTestId('avatar')).toBeTruthy());
    fireEvent.press(getByTestId('settings-button'));
    expect(getByText(`
    Welcome to Pode! This is a guide to help you navigate through the various features and functionalities available in this app.
    Here you can track your progress through completed lessons, and access new exercises. Make sure to explore all the options and customize your experience.
    If you have any questions or need further assistance, feel free to reach out to our support team. Enjoy your learning journey!
  `)).toBeTruthy();
    fireEvent.press(getByText('Continue'));
    await waitFor(() => expect(getByText('Start')).toBeTruthy());
  });

  it('navigates to user profile when avatar is pressed', async () => {
    mockAuthStorage.getUser.mockResolvedValue({ id: '1' });
    userService.getOne.mockResolvedValue({ id: '1', avatar: 'avatar1', completedLessons: [] });
    lessonService.getLessons.mockResolvedValue([]);

    const { getByTestId } = render(<ProgressMapView />);
    await waitFor(() => expect(getByTestId('avatar')).toBeTruthy());
    fireEvent.press(getByTestId('avatar'));
    expect(mockNavigate).toHaveBeenCalledWith('/users/1/profile');
  });
});
