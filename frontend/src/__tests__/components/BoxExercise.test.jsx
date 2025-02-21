import { render, fireEvent } from '@testing-library/react-native';
import { createRef } from 'react';
import BoxExercise from '../../components/exercise/BoxExercise';
import useBoxAnimations from '../../hooks/useBoxAnimations';

jest.mock('../../hooks/useBoxAnimations');

describe('BoxExercise Component', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const selectedAnswer = null;
    const setSelectedAnswer = jest.fn();

    beforeEach(() => {
        useBoxAnimations.mockReturnValue({
            animations: options.map(() => ({ getTranslateTransform: jest.fn() })),
            boxLayouts: { current: [] },
            dropZoneLayout: { current: {} },
            handlePress: jest.fn(),
            resetAnimationsInternal: jest.fn(),
        });
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <BoxExercise options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        options.forEach(option => {
            expect(getByText(option)).toBeDefined();
        });
    });

    it('handles press events', () => {
        const { getByText } = render(
            <BoxExercise options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        options.forEach(option => {
            fireEvent.press(getByText(option));
        });

        expect(useBoxAnimations().handlePress).toHaveBeenCalledTimes(options.length);
    });

    it('resets animations', () => {
        const ref = createRef();
        render(
            <BoxExercise ref={ref} options={options} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
        );

        ref.current.resetAnimations();
        expect(useBoxAnimations().resetAnimationsInternal).toHaveBeenCalled();
    });
});