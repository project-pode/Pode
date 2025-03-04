import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SingleExerciseView from '../../components/exercise/SingleExerciseView';
import { useNavigate, useParams } from 'react-router-native';
import exerciseService from '../../services/exercises';
import lessonService from "../../services/lessons";
import { Audio } from 'expo-av';

// Mocking the dependencies
jest.mock('react-router-native', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../../services/exercises', () => ({
  getOne: jest.fn(),
  completeExercise: jest.fn(),
}));

jest.mock('../../services/lessons', () => ({
  getLesson: jest.fn(),
  completeLesson: jest.fn(),
}));

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

describe('SingleExerciseView', () => {
  const navigate = jest.fn();
  const mockExercise = {
    title: 'Test Exercise',
    description: 'This is a test exercise',
    correctAnswer: 'Option 1',
  };
  const mockLesson = {
    exercises: [{ id: 1 }, { id: 2 }],
  };

  beforeEach(() => {
    // Mocking the hook and service responses
    useNavigate.mockReturnValue(navigate);
    useParams.mockReturnValue({
      userId: '1',
      lessonId: '1',
      exerciseId: '1',
    });
    exerciseService.getOne.mockResolvedValue(mockExercise);
    lessonService.getLesson.mockResolvedValue(mockLesson);
  });

  it('renders correctly', async () => {
    const { getByText } = render(<SingleExerciseView />);

    // Wait for the component to load the exercise data
    await waitFor(() => expect(getByText('Test Exercise')).toBeTruthy());
    expect(getByText('This is a test exercise')).toBeTruthy();
  });

  it('handles answer selection and feedback for correct answer', async () => {
    const { getByText, getByTestId } = render(<SingleExerciseView />);

    // Wait for the exercise to load
    await waitFor(() => expect(getByText('Test Exercise')).toBeTruthy());

    // Simulate clicking "Check" button
    fireEvent.press(getByText('Check'));

  });

  it('handles answer selection and feedback for incorrect answer', async () => {
    const { getByText, getByTestId } = render(<SingleExerciseView />);

    // Wait for the exercise to load
    await waitFor(() => expect(getByText('Test Exercise')).toBeTruthy());

    // Simulate selecting an incorrect answer
    fireEvent.press(getByText('Choose answer here')); // Assuming the exercise has a dropdown
    fireEvent.press(getByText('Option 2')); // Selecting an incorrect answer

    // Simulate clicking "Check" button
    fireEvent.press(getByText('Check'));

    // Verify feedback for incorrect answer
    await waitFor(() => expect(getByText('Incorrect answer.\nPlease try again.')).toBeTruthy());

    // Ensure that the incorrect sound is played
    expect(Audio.Sound.mock.instances[1].replayAsync).toHaveBeenCalled();
  });

  it('navigates to the next exercise when clicking "Next"', async () => {
    const { getByText } = render(<SingleExerciseView />);

    // Wait for the exercise to load
    await waitFor(() => expect(getByText('Test Exercise')).toBeTruthy());

    // Simulate completing the exercise
    fireEvent.press(getByText('Check'));

    // Simulate selecting "Next" once the exercise is completed
    fireEvent.press(getByText('Next'));

    // Verify navigation
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/users/1/lessons/1/exercises/2'));
  });

  it('handles back press and shows confirmation popup', async () => {
    const { getByText } = render(<SingleExerciseView />);

    // Wait for the exercise to load
    await waitFor(() => expect(getByText('Test Exercise')).toBeTruthy());

    // Simulate pressing the back button
    fireEvent.press(getByText('close'));

    // Verify that the confirmation popup is shown
    await waitFor(() => expect(getByText('Progress will be lost. Are you sure you want to end this lesson?')).toBeTruthy());
  });
});