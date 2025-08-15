import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigate, useParams } from 'react-router-native';
import exerciseService from '../../../services/exercises';
import lessonService from '../../../services/lessons';
import SingleExerciseView from '../../../components/exercise/SingleExerciseView';

jest.mock('@expo/vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-router-native', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn()
}));

jest.mock('../../../services/exercises', () => ({
    getOne: jest.fn(),
    completeExercise: jest.fn()
}));

jest.mock('../../../services/lessons', () => ({
    getLesson: jest.fn(),
    completeLesson: jest.fn()
}));

jest.mock('expo-av', () => ({
    Audio: {
        Sound: jest.fn(() => ({
            loadAsync: jest.fn(),
            unloadAsync: jest.fn(),
            replayAsync: jest.fn()
        }))
    }
}));
const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useParams as jest.Mock).mockReturnValue({ lessonId: '1', exerciseId: '101' });

describe('SingleExerciseView', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly and fetches exercise and lesson data', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({
            id: '101', title: 'Test Exercise', description: 'Test Description', correctAnswer: 'A', type: 'box', options: ['A', 'B', 'C'], lesson: 1
        });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({
            id: '1', exercises: [{id: '101', title: 'Test Exercise', description: 'Test Description', correctAnswer: 'A', type: 'box', options: ['A', 'B', 'C'], lesson: 1}]
        });

        const { getByText } = render(<SingleExerciseView />);
        await waitFor(() => getByText('Test Exercise'));
        expect(getByText('Test Description')).toBeTruthy();
    }, 10000);

    it('shows confirmation popup when back button is pressed', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({ id: '101', title: 'Exercise' });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ id: '1', exercises: [] });


        const { getByTestId, getByText } = render(<SingleExerciseView />);
        await waitFor(() => expect(getByTestId('back-button')).toBeTruthy());
        fireEvent.press(getByTestId('back-button'));

        await waitFor(() => expect(getByText('Progress will be lost. Are you sure you want to end this lesson?')).toBeTruthy());
    });

    it('calls completeExercise when checking the correct answer', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({
            id: '101', title: 'Exercise', description: "a", correctAnswer: ['A'], options: ['A', 'B', 'C'], lesson: 1, type: 'box'
        });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ id: '1', exercises: [{ id: '101' }] });

        const { getByText } = render(<SingleExerciseView />);
        await waitFor(() => getByText('Exercise'));

        fireEvent.press(getByText('A'));
        fireEvent.press(getByText('Check'));

        await waitFor(() => expect(exerciseService.completeExercise).toHaveBeenCalled());
    });

    it('navigates to the next exercise when clicking next', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({ id: '101', title: 'Exercise', correctAnswer: ['A'], options: ['A', 'B', 'C'], lesson: 1, type: 'box' });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({
            id: '1',
            exercises: [{ id: '101' }, { id: '102' }]
        });

        const { getByText } = render(<SingleExerciseView />);
        await waitFor(() => getByText('Exercise'));
        fireEvent.press(getByText('A'));

        fireEvent.press(getByText('Check'));

        await waitFor(() => fireEvent.press(getByText('Next')));
        await waitFor(() => expect(navigate).toHaveBeenCalledWith('/lessons/1/exercises/102'));
    });

    it('calls completeLesson when finishing the last exercise', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({ id: '102', title: 'Last Exercise', correctAnswer: ['A'], options: ['A', 'B', 'C'], lesson: 1, type: 'box' });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ id: '1', title: "aloo", description: "yo", exercises: [{ id: '102', title: 'Last Exercise', correctAnswer: ['A'], options: ['A', 'B', 'C'], lesson: 1, type: 'box' }] });

        const { getByText } = render(<SingleExerciseView />);
        await waitFor(() => getByText('Last Exercise'));

        fireEvent.press(getByText('A'));
        fireEvent.press(getByText('Check'));
        await waitFor(() => expect(exerciseService.completeExercise).toHaveBeenCalled());
        fireEvent.press(getByText('Next'));

        await waitFor(() => expect(lessonService.completeLesson).toHaveBeenCalled());
    });
});
