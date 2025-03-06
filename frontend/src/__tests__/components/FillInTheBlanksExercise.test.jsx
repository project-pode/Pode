import { render, fireEvent } from '@testing-library/react-native';
import { createRef } from 'react';
import FillInTheBlanksExercise from '../../components/exercise/FillInTheBlanksExercise';
import useFillInTheBlanksAnimations from '../../hooks/useFillInTheBlanksAnimations';

jest.mock('../../hooks/useFillInTheBlanksAnimations');
jest.mock('../../themes/fillInTheBlanksExerciseTheme', () => ({
    pinkContainerBox: {},
    questionContainer: {},
    notBlankBox: {},
    boxExerciseBoxText: {},
    boxesContainer: {}
}));
jest.mock('../../themes/mainTheme', () => ({
    exerciseDescription: {}
}));

describe('FillInTheBlanksExercise Component', () => {
    const options = ['Word 1', 'Word 2', 'Word 3'];
    const question = ['This is a', 'blank', 'sentence with', 'blank', 'spaces.'];
    const selectedAnswer = null;
    const setSelectedAnswer = jest.fn();

    beforeEach(() => {
        useFillInTheBlanksAnimations.mockReturnValue({
            animations: options.map(() => ({ getTranslateTransform: () => [] })),
            boxRefs: { current: options.map(() => createRef()) },
            blankRefs: { current: question.map(() => createRef()) },
            blanks: Array(question.length).fill(null),
            handlePress: jest.fn(),
            resetAnimationsInternal: jest.fn(),
        });
    });

    it('renders correctly', () => {
        const { getByTestId, getAllByText } = render(
            <FillInTheBlanksExercise 
                options={options} 
                question={question} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
            />
        );

        // Test that all options are rendered in the boxes container
        options.forEach(option => {
            const elements = getAllByText(option);
            expect(elements.length).toBeGreaterThan(0);
        });

        // Test that non-blank question parts are rendered
        question.forEach(item => {
            if (item !== 'blank' && item !== 'newLine') {
                expect(getAllByText(item)[0]).toBeTruthy();
            }
        });

        // Test that blank boxes are rendered with placeholder
        const longestString = options.reduce((longest, current) => 
            current.length > longest.length ? current : longest, '');
        const blankCount = question.filter(item => item === 'blank').length;
        const placeholderText = longestString || '[ ]';
        const placeholders = getAllByText(placeholderText);
        expect(placeholders.length).toBeGreaterThanOrEqual(blankCount);
    });

    it('handles press events', () => {
        const mockHandlePress = jest.fn();
        useFillInTheBlanksAnimations.mockReturnValue({
            ...useFillInTheBlanksAnimations(),
            handlePress: mockHandlePress
        });

        const { getAllByText } = render(
            <FillInTheBlanksExercise 
                options={options} 
                question={question} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
            />
        );

        options.forEach((option, index) => {
            // Get all elements with this text and press the last one (which should be in the options box)
            const elements = getAllByText(option);
            fireEvent.press(elements[elements.length - 1]);
            expect(mockHandlePress).toHaveBeenCalledWith(option, index);
        });

        expect(mockHandlePress).toHaveBeenCalledTimes(options.length);
    });

    it('resets animations when ref method is called', () => {
        const mockResetAnimations = jest.fn();
        useFillInTheBlanksAnimations.mockReturnValue({
            ...useFillInTheBlanksAnimations(),
            resetAnimationsInternal: mockResetAnimations
        });

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
        expect(mockResetAnimations).toHaveBeenCalled();
    });
});