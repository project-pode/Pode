import { render, waitFor, screen } from '@testing-library/react-native';
import LessonView from '../../components/LessonView';
import { MemoryRouter } from 'react-router-native';
import lessonService from '../../services/lessons';
import { Text } from 'react-native';

const MockMaterialIcons = (props) => <Text>{props.name}</Text>;

jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: MockMaterialIcons,
}));

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            API_URL: 'http://mock-api-url.com'
        }
    }
}));

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
