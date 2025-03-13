import { render, waitFor, screen } from '@testing-library/react-native';
import { MemoryRouter } from 'react-router-native';
import LessonView from '../../../components/lesson/LessonView';
import { Lesson, Exercise } from '../../../types';
import lessonService from '../../../services/lessons';

jest.mock('expo-asset', () => ({
    Asset: {
        loadAsync: jest.fn(),
    },
}));

jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
    isLoaded: jest.fn().mockReturnValue(true),
    isLoading: jest.fn().mockReturnValue(false)
}));

jest.mock('../../../services/lessons');

const mockLesson: Lesson = {
    id: '1',
    title: 'Test Lesson Title',
    description: 'Test Lesson Description',
    exercises: [{ id: '1', title: 'Exercise 1' }] as Exercise[]
};

lessonService.getLesson.mockResolvedValue(mockLesson);

describe('LessonView', () => {
    it('renders lesson title and lesson description', async () => {
        render(
            <MemoryRouter>
                <LessonView/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Test Lesson Title')).toBeTruthy();
            expect(screen.getByText('Test Lesson Description')).toBeTruthy();
        });
    });
});
