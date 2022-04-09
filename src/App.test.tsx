import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

describe('heading', () => {
	test('renders heading', () => {
		render(<App />);
		const title = screen.getByRole('heading', {name: 'Hangman'})
		expect(title).toBeVisible()
	});
})