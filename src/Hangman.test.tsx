import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
import Hangman from './Hangman';
describe("hangman", () => {
	it("renders given word", () => {
    render(<Hangman currentWord = {'pineapple'} />)
    expect(screen.getByText('pineapple')).toBeVisible()
  })
})



describe('input', () => {
	test('elements render', () => {
		render(<Hangman currentWord='' />);
		const input = screen.getByRole('textbox', {name: 'Letter'})
		expect(input).toBeVisible()
		expect(getSubmitButton()).toBeVisible()
	});
	test('input updates graveyard', () => {
		render(<Hangman currentWord="" />)
		const input = screen.getByRole('textbox', {name: 'Letter'})
		userEvent.type(input, 'z')
		userEvent.click(getSubmitButton())
		expect(screen.getByText('z')).toBeVisible()
	})
	test('input takes one value', () => {
		render(<Hangman currentWord="" />)
		const input = screen.getByRole('textbox', {name: 'Letter'})
		userEvent.type(input, 'asdfasdfasdf')
		expect(getSubmitButton()).toBeDisabled()
	})
	test('no repeat inputs', () => {
		render(<Hangman currentWord="" />)
		const input = screen.getByRole('textbox', {name: 'Letter'})
		userEvent.type(input, 'z')
		userEvent.click(getSubmitButton())
		userEvent.type(input, 'z')
		expect(getSubmitButton()).toBeDisabled()
	})
  test('target word', () => {
    render(<Hangman currentWord="at" />)
    const input = screen.getByRole('textbox', {name: 'Letter'})
    const bank = screen.getByLabelText('target word')
    userEvent.type(input, 'a')
    userEvent.click(getSubmitButton())
    expect(within(bank).getByText('a')).toBeVisible()
  })
});

// describe('outcomes', () => {
//   test('winning', () => {
//     render(<Hangman currentWord="at" />)
//     const win = 
//   })
// });

function getSubmitButton() {
  return screen.getByRole('button', { name: 'submit' });
}
