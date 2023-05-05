import React from 'react';
import { cleanup, render } from '@testing-library/react';
import DarkModeToggler from './DarkModeToggler';

describe('DarkModeToggler component', () => {
  afterEach(cleanup);

  it('shows SunIcon when isDarkMode is true', () => {
    const { queryByTestId } = render(<DarkModeToggler isDarkMode={true} setIsDarkMode={() => null} />);
    expect(queryByTestId('sun-icon')).toBeVisible();
    expect(queryByTestId('moon-icon')).toBeNull();
  });

  it('shows MoonIcon when isDarkMode is false', () => {
    const { queryByTestId } = render(<DarkModeToggler isDarkMode={false} setIsDarkMode={() => null} />);
    expect(queryByTestId('sun-icon')).toBeNull();
    expect(queryByTestId('moon-icon')).toBeVisible();
  });
});
