import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { useNavigate, useParams } from 'react-router-native';
import SingleExerciseView from '../../components/exercise/SingleExerciseView';
import exerciseService from '../../services/exercises';
import lessonService from '../../services/lessons';
import PopUp from '../../components/PopUp';

jest.mock('react-router-native', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('../../services/exercises');
jest.mock('../../services/lessons');
jest.mock('../../components/PopUp', () => jest.fn(() => null));
jest.mock('expo-av', () => ({
    Audio: {
        Sound: jest.fn(() => ({
            loadAsync: jest.fn(),
            replayAsync: jest.fn(),
            unloadAsync: jest.fn(),
        })),
    },
}));

describe('SingleExerciseView Component', () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useParams as jest.Mock).mockReturnValue({ lessonId: '1', exerciseId: '101' });
    });

    it('renders loading view initially', async () => {
        const { getByTestId } = render(<SingleExerciseView />);
        expect(getByTestId("test")).toBeTruthy();
    });

    it('renders exercise after fetching data', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({
            id: '101',
            title: 'Sample Exercise',
            description: 'Sample Description',
            correctAnswer: 'Correct Answer',
        });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ exercises: [{ id: '101' }] });

        const { getByText } = render(<SingleExerciseView />);
        await waitFor(() => expect(getByText('Sample Exercise')).toBeTruthy());
        expect(getByText('Sample Description')).toBeTruthy();
    });

    it('shows feedback popup for incorrect answer', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({
            id: '101',
            title: 'Sample Exercise',
            description: 'Sample Description',
        });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ exercises: [{ id: '101' }] });

        const { getByText} = render(<SingleExerciseView />);
        await waitFor(() => getByText('Sample Exercise'));

        await act(async () => {
        fireEvent.press(getByText('Check'));
        });
        await waitFor(() => {
            expect(PopUp).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    visible: true,
                    message: 'Incorrect answer.\nPlease try again.',
                }),
                {}
            );
        });

    });
    
    it('navigates to the next exercise after correct answer', async () => {
        (exerciseService.getOne as jest.Mock).mockResolvedValue({
            id: '101',
            title: 'Sample Exercise',
            description: 'Sample Description',
            correctAnswer: 'Correct Answer',
        });
        (lessonService.getLesson as jest.Mock).mockResolvedValue({ exercises: [{ id: '101' }, { id: '102' }] });

        const { getByText} = render(<SingleExerciseView />);
        await waitFor(() => getByText('Sample Exercise'));

        fireEvent.press(getByText('Check'));
        await waitFor(() => expect(PopUp).toHaveBeenCalledWith(expect.objectContaining({
            visible: true,
            message: 'Correct answer!\nExercise completed.',
        }), {}));

        fireEvent.press(getByText('Next'));
        expect(mockNavigate).toHaveBeenCalledWith('/lessons/1/exercises/102');
    });
});
