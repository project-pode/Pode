import { render, waitFor, screen } from '@testing-library/react-native';
import LessonView from '../../components/lesson/LessonView';
import { MemoryRouter } from 'react-router-native';
import lessonService from '../../services/lessons';

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

jest.mock('../../services/lessons');

const mockLesson = {
    id: '1',
    title: 'Test Lesson Title',
    description: 'Test Lesson Description',
    exercises: [{ id: '1', title: 'Exercise 1' }]
};

lessonService.getLesson.mockResolvedValue(mockLesson);

describe('LessonView', () => {
    it('renders lesson title and lesson description', async () => {
        render(
            <MemoryRouter>
                <LessonView lesson={mockLesson}/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Test Lesson Title')).toBeTruthy();
            expect(screen.getByText('Test Lesson Description')).toBeTruthy();
        });
    });
});
