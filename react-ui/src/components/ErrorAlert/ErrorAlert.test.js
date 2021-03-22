import React from 'react'
import { render, logRoles, fireEvent, screen, getRoles, prettyDOM } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import ErrorAlert from './ErrorAlert'
import initialState from '../../stateManagement/initialState'

let stateWithError = {
  input: 'balwill@salesforce.com',
  inputSubmitted: 'balwill@salesforce.com',
  currentJobId: '',
  error: {
    message: 'Request failed with status code 504',
    name: 'Error',
    stack: 'Error: Request failed with status code 504\n    at createError (http://localhost:3000/static/js/vendors~main.chunk.js:67956:15)\n    at settle (http://localhost:3000/static/js/vendors~main.chunk.js:68190:12)\n    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/vendors~main.chunk.js:67430:7)',
    config: {
      url: 'api/findSubscriberJob',
      method: 'post',
      data: '{"inputSubmitted":"balwill@salesforce.com"}',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      transformRequest: [
        null
      ],
      transformResponse: [
        null
      ],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1
    }
  },
  findSubscriberJobs: [],
  _persist: {
    version: -1,
    rehydrated: true
  }
}

test('Renders <ErrorAlert /> when Error props is populated', () => {
  render(<ErrorAlert />, { initialState: stateWithError })

  const errorAlert = screen.getByTestId('errorAlert')

  expect(errorAlert).toBeInTheDocument()
})

test('Renders header message', () => {
  render(<ErrorAlert />, { initialState: stateWithError })

  const headerMessage = screen.getByRole('heading', {name: 'Error: Request failed with status code 504'})

  expect(headerMessage).toBeInTheDocument()
})

test('Renders <ErrorAlert /> with close button', () => {
  render(<ErrorAlert />, { initialState: stateWithError })

  const closeButton = screen.getByRole('button', {name: 'Close'})

  expect(closeButton).toBeInTheDocument()
})