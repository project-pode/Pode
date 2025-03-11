import { render, screen } from '@testing-library/react-native';
import StartView from '../../components/authentication/StartView';
import { MemoryRouter } from 'react-router-native';

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