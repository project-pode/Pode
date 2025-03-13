import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import { MemoryRouter } from 'react-router-native';
import SingleExerciseView from '../../components/exercise/SingleExerciseView';
import exerciseService from '../../services/exercises';
import lessonService from '../../services/lessons';
import { Exercise, Lesson } from '../../types';
import { Audio } from 'expo-av';

// Mock the services and the necessary modules
jest.mock('expo-av', () => ({
    Audio: {
        Sound: jest.fn().mockImplementation(() => ({
            loadAsync: jest.fn(),
            replayAsync: jest.fn(),
            unloadAsync: jest.fn(),
        })),
    },
}));

jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('../../services/exercises');
jest.mock('../../services/lessons');
jest.mock('react-router-native', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ lessonId: '1', exerciseId: '1' }),
}));

const mockExercise: Exercise = {
    id: '1',
    title: 'Test Exercise Title',
    description: 'Test Exercise Description',
    correctAnswer: ['Test Answer'],
    type: 'blanks',
    question: ['Test Question'],
    lesson: '1',
    options: ['Option 1', 'Option 2', 'Option 3'],
};

const mockLesson: Lesson = {
    id: '1',
    title: 'Test Lesson Title',
    description: 'Test Lesson Description',
    exercises: [{ id: '1', title: 'Test Exercise Title' }] as Exercise[],
};

exerciseService.getOne.mockResolvedValue(mockExercise);
lessonService.getLesson.mockResolvedValue(mockLesson);

describe('SingleExerciseView', () => {
    it('renders exercise title and description', async () => {
        render(
            <MemoryRouter>
                <SingleExerciseView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Exercise Title')).toBeTruthy();
            expect(screen.getByText('Test Exercise Description')).toBeTruthy();
        });
    });

    it('renders feedback popup after answering', async () => {
        render(
            <MemoryRouter>
                <SingleExerciseView />
            </MemoryRouter>
        );

        // Wait for the exercise to load
        await waitFor(() => expect(exerciseService.getOne).toHaveBeenCalled());

        // Simulate answering the exercise
        fireEvent.press(screen.getByTestId('check-button'));

        // Wait for feedback popup to appear
        await waitFor(() => {
            expect(screen.getByText('Incorrect answer.\nPlease try again.')).toBeTruthy();
        });
    });

    it('navigates to the next exercise', async () => {
        const navigate = require('react-router-native').useNavigate();  // Correctly get the mock navigate function
    
        render(
            <MemoryRouter>
                <SingleExerciseView />
            </MemoryRouter>
        );
    
        // Wait for the exercise to load
        await waitFor(() => expect(exerciseService.getOne).toHaveBeenCalled());
    
        // Simulate answering the exercise correctly
        fireEvent.press(screen.getByTestId('check-button'));
    
        // Wait for the next button to become available and press it
        await waitFor(() => {
            expect(screen.getByText('Next')).toBeTruthy();
        });
        fireEvent.press(screen.getByText('Next'));
    
        // Ensure navigation to next exercise
        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/lessons/1/exercises/1');
        });
    });

    it('displays a confirmation popup when back button is pressed', async () => {
        render(
            <MemoryRouter>
                <SingleExerciseView />
            </MemoryRouter>
        );

        // Simulate back button press
        fireEvent.press(screen.getByTestId('back-button'));

        // Wait for the confirmation popup to show up
        await waitFor(() => {
            expect(screen.getByText('Progress will be lost. Are you sure you want to end this lesson?')).toBeTruthy();
        });
    });
});
