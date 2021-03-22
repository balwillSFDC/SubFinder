import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import Form from './Form'
import initialState from '../../stateManagement/initialState'
import userEvent from '@testing-library/user-event'

test('Renders <Form />', () => {
  render(<Form />, initialState)
  
  const formComponent = screen.getByTestId('form')

  expect(formComponent).toBeInTheDocument()
})

test('Renders Submit button in a disabled state', () => {
  render(<Form />, initialState)

  const formButton = screen.getByRole('button', {name: 'Submit'})

  expect(formButton).toBeInTheDocument()
  expect(formButton).toBeDisabled()
})

test('Submit button is enabled when input is an email', () => {
  let state = {
    input: 'test@test.com',
    inputSubmitted: '',
    currentJobId: '',
    error: {},
    findSubscriberJobs: []
  };
  
  render(<Form />, {initialState: state})

  const formButton = screen.getByRole('button', {name: 'Submit'})

  expect(formButton).toBeEnabled()
})

test('Form has an input for email address', () => {
  render(<Form />, initialState)

  const emailInput = screen.getByRole('textbox')
 
  expect(emailInput).toBeInTheDocument()
  expect(emailInput).toHaveAttribute('aria-required', 'true')
  expect(emailInput).toHaveAttribute('type', 'email')
})

test('Typing working', () => {
  render(<Form />, initialState)
  
  const emailInput = screen.getByRole('textbox')
  
  userEvent.type(emailInput, 'test@test.com')
  expect(emailInput).toHaveValue('test@test.com')
})
