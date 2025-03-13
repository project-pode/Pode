import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import SingleExerciseView from '../../components/exercise/SingleExerciseView';
import { MemoryRouter, Route, Routes } from 'react-router-native';
import { useParams } from 'react-router-native';
import exerciseService from '../../services/exercises';

jest.mock('../../services/exercises', () => ({
    getExercise: jest.fn(),  // Mock the getExercise function explicitly
  }));

  
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('../../services/exercises');
jest.mock('react-router-native', () => {
    const actual = jest.requireActual('react-router-native');
    return {
        ...actual,
        useParams: jest.fn(),
        useNavigate: jest.fn(),
    };
});

jest.mock('expo-av', () => ({
    Audio: {
      Sound: jest.fn().mockImplementation(() => ({
        loadAsync: jest.fn(),
        replayAsync: jest.fn(),
        unloadAsync: jest.fn(),
      })),
    },
  }));

const mockExercise = {
    id: '1',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    correctAnswer: '4',
};

exerciseService.getExercise.mockResolvedValue(mockExercise);

describe('SingleExerciseView', () => {
    let navigateMock: jest.Mock;
    let mockParams: { lessonId: string; exerciseId: string };

    beforeEach(() => {
        // Reset mocks before each test
        navigateMock = jest.fn();
        mockParams = { lessonId: '1', exerciseId: '1' };
        
        // Mock useParams and useNavigate
        (useParams as jest.Mock).mockReturnValue(mockParams);
        require('react-router-native').useNavigate.mockReturnValue(navigateMock);
    });

    const renderComponent = () => {
        return render(
            <MemoryRouter initialEntries={[`/lessons/${mockParams.lessonId}/exercises/${mockParams.exerciseId}`]}>
                <Routes>
                    <Route path="/lessons/:lessonId/exercises/:exerciseId" element={<SingleExerciseView />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render exercise and options correctly', async () => {
        renderComponent();

        await waitFor(() => screen.getByText('What is 2 + 2?'));
        expect(screen.getByText('3')).toBeTruthy();
        expect(screen.getByText('4')).toBeTruthy();
        expect(screen.getByText('5')).toBeTruthy();
    });

    it('should not allow submission without selecting an answer', async () => {
        renderComponent();
        
        // Submit without selecting an answer
        fireEvent.press(screen.getByText('Submit'));
        
        // Assert feedback or alert showing that an answer must be selected
        expect(screen.getByText('Please select an answer')).toBeTruthy(); // Adjust the message as per actual behavior
    });

    it('should submit and show feedback for correct answer', async () => {
        renderComponent();
        
        // Select correct answer
        fireEvent.press(screen.getByText('4'));

        // Submit answer
        fireEvent.press(screen.getByText('Submit'));
        
        // Assert feedback
        expect(screen.getByText('Correct!')).toBeTruthy(); // Adjust feedback message as per actual behavior
    });

    it('should navigate to next exercise or finish lesson if no next exercise exists', async () => {
        renderComponent();
        
        // Simulate the completion of this exercise and check for navigation
        fireEvent.press(screen.getByText('Next Exercise'));

        expect(navigateMock).toHaveBeenCalledWith('/lessons/1/completed'); // Adjust this path according to actual behavior
    });

    it('should show confirmation popup when back button is pressed', async () => {
        renderComponent();
        
        // Simulate pressing the back button
        fireEvent.press(screen.getByText('Back'));
        
        // Check for confirmation popup text
        expect(screen.getByText('Are you sure you want to go back?')).toBeTruthy(); // Adjust as needed
    });
});
