import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropdownForm from '../../components/exercise/DropdownForm';

describe('DropdownForm', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const setSelectedAnswer = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <DropdownForm options={options} setSelectedAnswer={setSelectedAnswer} />
    );

    // Check if the placeholder text is rendered
    expect(getByText('Choose answer here')).toBeTruthy();
  });

  it('calls setSelectedAnswer with the correct value when an option is selected', () => {
    const { getByText } = render(
      <DropdownForm options={options} setSelectedAnswer={setSelectedAnswer} />
    );

    // Open the dropdown
    fireEvent.press(getByText('Choose answer here'));

    // Select an option
    fireEvent.press(getByText('Option 2'));

    // Check if setSelectedAnswer is called with the correct value
    expect(setSelectedAnswer).toHaveBeenCalledWith('Option 2');
  });
});