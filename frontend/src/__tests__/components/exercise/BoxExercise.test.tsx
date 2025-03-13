import { render, fireEvent } from '@testing-library/react-native';
import { createRef } from 'react';
import BoxExercise from '../../../components/exercise/BoxExercise';
import useBoxAnimations from '../../../hooks/useBoxAnimations';

// Mock the custom hook
jest.mock('../../../hooks/useBoxAnimations');

describe('BoxExercise Component', () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3']; // Correct options
    const selectedAnswer: string[] | null = null;
    const setSelectedAnswer = jest.fn();


    beforeEach(() => {
        // Mock implementation to pass correct options
        (useBoxAnimations as jest.Mock).mockImplementation(({options}) => ({
                animations: options.map(() => ({ getTranslateTransform: jest.fn() })),
                boxLayouts: { current: [] },
                dropZoneLayout: { current: {} },
                handlePress: jest.fn(),
                resetAnimationsInternal: jest.fn(),
        }));
    });

    it('renders correctly with correct options', () => {
        const { getByText } = render(
            <BoxExercise options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        // Ensure all options are rendered
        options.forEach(option => {
            expect(getByText(option)).toBeDefined();
        });
    });

    it('handles press events for correct options', () => {
        const mockHandlePress = jest.fn();
        (useBoxAnimations as jest.Mock).mockReturnValue({
            ...useBoxAnimations({ options, selectedAnswer, setSelectedAnswer }),
            handlePress: mockHandlePress,
        });

        const { getByText } = render(
            <BoxExercise options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        options.forEach((option, index) => {
            fireEvent.press(getByText(option));
            expect(mockHandlePress).toHaveBeenCalledWith(option, index);
        });

        // Check that the mock handlePress function was called the correct number of times
        expect(mockHandlePress).toHaveBeenCalledTimes(options.length);
    });

    it('resets animations correctly', () => {
        const mockResetAnimations = jest.fn();
        (useBoxAnimations as jest.Mock).mockReturnValue({
            ...useBoxAnimations({ options, selectedAnswer, setSelectedAnswer }),
            resetAnimationsInternal: mockResetAnimations,
        });
        const ref = createRef<{ resetAnimations: () => void }>();
        render(
            <BoxExercise ref={ref} options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        ref.current?.resetAnimations();

        // Verify that resetAnimationsInternal was called
        expect(mockResetAnimations).toHaveBeenCalled();
    });
});
