import { render, screen } from '@testing-library/react-native';
import StartView from '../../components/StartView';
import { MemoryRouter } from 'react-router-native';

describe('App Name', () => {
  it('renders the app name', () => {
    render(
        <MemoryRouter>
            <StartView />
        </MemoryRouter>
    );
    expect(screen.getByText('<Pode/>')).toBeDefined();
  });
});