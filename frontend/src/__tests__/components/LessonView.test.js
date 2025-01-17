import { render, fireEvent, screen } from '@testing-library/react-native';
import LessonView from '../../components/LessonView';
import { MemoryRouter, useNavigate, useParams } from 'react-router-native';
import React from 'react';

// Mock useNavigate and useParams
jest.mock('react-router-native', () => ({
    ...jest.requireActual('react-router-native'),
    useNavigate: jest.fn(),
    useParams: jest.fn()
}));

// Mock Constants
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            API_URL: 'https://mock-api-url.com'
        }
    }
}));

describe('LessonView component', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ userId: '1', lessonId: '1' });
        useNavigate.mockReturnValue(jest.fn());
    });

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <LessonView />
            </MemoryRouter>
        );

        expect(screen).toBeTruthy();
    });

    it('shows popup when back button is pressed', () => {
        render(
            <MemoryRouter>
                <LessonView />
            </MemoryRouter>
        );

        const backButton = screen.getByText('Back');
        fireEvent.press(backButton);

        expect(screen.getByText('Are you sure you want to go back?')).toBeTruthy();
    });

    it('navigates to lessons page on confirm', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <LessonView />
            </MemoryRouter>
        );

        const backButton = screen.getByText('Back');
        fireEvent.press(backButton);

        const confirmButton = screen.getByText('Confirm');
        fireEvent.press(confirmButton);

        expect(mockNavigate).toHaveBeenCalledWith('/users/1/lessons');
    });

    it('hides popup on cancel', () => {
        render(
            <MemoryRouter>
                <LessonView />
            </MemoryRouter>
        );

        const backButton = screen.getByText('Back');
        fireEvent.press(backButton);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.press(cancelButton);

        expect(screen.queryByText('Are you sure you want to go back?')).toBeNull();
    });
});