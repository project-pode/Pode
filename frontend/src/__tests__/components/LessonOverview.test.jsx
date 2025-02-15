import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import LessonOverview from '../../components/LessonOverview';
import { MemoryRouter, Route, Routes } from 'react-router-native';
import lessonService from '../../services/lessons';

jest.mock('../../services/lessons');

jest.mock('react-router-native', () => {
    const actual = jest.requireActual('react-router-native');
    return {
        ...actual,
        useNavigate: jest.fn(),
    };
});

const mockLesson = {
    id: '1',
    title: 'Test Lesson Title',
    exercises: [{ id: '1' }, { id: '2' }, { id: '3' }],
};

lessonService.getLesson.mockResolvedValue(mockLesson);

describe('LessonOverview', () => {
    let navigateMock;

    beforeEach(() => {
        navigateMock = jest.fn();
        require('react-router-native').useNavigate.mockReturnValue(navigateMock);
    });

    const renderComponent = () => {
        return render(
            <MemoryRouter initialEntries={['/users/1/lessons/1']}>
                <Routes>
                    <Route 
                        path="/users/:userId/lessons/:lessonId" 
                        element={<LessonOverview />} 
                    />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should display loading state initially', () => {
        const {getByTestId} = renderComponent();
        expect(screen.getByTestId('test')).toBeTruthy();
    });

    it('should render lesson overview after lesson loads', async () => {
        renderComponent(3); // Pass 3 as completedExercises
        await waitFor(() => {
            expect(screen.getByText('Congratulations!')).toBeTruthy();
            expect(screen.getByText(/You got.*out of.*3.*right!/)).toBeTruthy(); // Use regex to match dynamic text rendering
        });
        
    });
    
    it('should navigate back when exit button is pressed', async () => {
        renderComponent();
        await waitFor(() => screen.getByText('Exit'));
        fireEvent.press(screen.getByText('Exit'));
        expect(navigateMock).toHaveBeenCalledWith('/users/1/lessons');
    });
});
