import { render, fireEvent } from '@testing-library/react-native';
import { createRef } from 'react';
import FillInTheBlanksExercise from '../../components/exercise/FillInTheBlanksExercise';
import useFillInTheBlanksAnimations from '../../hooks/useFillInTheBlanksAnimations';

jest.mock('../../hooks/useFillInTheBlanksAnimations');

describe('FillInTheBlanksExercise Component', () => {
    const options = ['Word 1', 'Word 2', 'Word 3'];
    const question = ['This is a', 'blank', 'sentence with', 'blank', 'spaces.'];
    const selectedAnswer = null;
    const setSelectedAnswer = jest.fn();

    beforeEach(() => {
        useFillInTheBlanksAnimations.mockReturnValue({
            animations: options.map(() => ({ getTranslateTransform: jest.fn() })),
            boxRefs: { current: options.map(() => createRef()) },
            blankRefs: { current: question.map(() => createRef()) },
            blanks: Array(question.length).fill(null),
            handlePress: jest.fn(),
            resetAnimationsInternal: jest.fn(),
        });
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <FillInTheBlanksExercise 
                options={options} 
                question={question} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
            />
        );

        options.forEach(option => {
            expect(getByText(option)).toBeDefined();
        });
    });

    it('handles press events', () => {
        const { getByText } = render(
            <FillInTheBlanksExercise 
                options={options} 
                question={question} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
            />
        );

        options.forEach(option => {
            fireEvent.press(getByText(option));
        });

        expect(useFillInTheBlanksAnimations().handlePress).toHaveBeenCalledTimes(options.length);
    });

    it('resets animations', () => {
        const ref = createRef();
        render(
            <FillInTheBlanksExercise 
                ref={ref} 
                options={options} 
                question={question} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
            />
        );

        ref.current.resetAnimations();
        expect(useFillInTheBlanksAnimations().resetAnimationsInternal).toHaveBeenCalled();
    });
});
