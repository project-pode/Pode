import { render, screen } from '@testing-library/react-native';
import { MemoryRouter } from 'react-router-native';
import StartView from '../../../components/authentication/StartView';

describe('App Name', () => {
  it('renders the app name', () => {
    render(
        <MemoryRouter>
            <StartView user={null} />
        </MemoryRouter>
    );
    expect(screen.getByText('<Pode/>')).toBeDefined();
  });
});