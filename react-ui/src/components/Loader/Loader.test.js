import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import Loader from './Loader'
import initialState from '../../stateManagement/initialState'
import userEvent from '@testing-library/user-event'

let stateWithProcessingJob = {
  input: 'balwill@bu.edu',
  inputSubmitted: 'balwill@bu.edu',
  currentJobId: '39',
  error: {},
  findSubscriberJobs: [
    {
      id: '39',
      timeSubmitted: '2021-03-22T19:07:39.155Z',
      inputSubmitted: 'balwill@bu.edu',
      state: 'active'
    }
  ],
  _persist: {
    version: -1,
    rehydrated: true
  }
}

test('Renders without crashing ', () => {
  render(<Loader />, {initialState: stateWithProcessingJob})

  const loadingMessage = screen.getByTestId('spinner-message').textContent
  const loader = screen.getByText('Main Frame Loading...')
  const spinner = screen.getByTestId('spinner')

  expect(loadingMessage).toEqual('Hold tight! We are finding balwill@bu.edu for you')
  expect(loader).toBeInTheDocument()
  expect(spinner).toBeInTheDocument()
})