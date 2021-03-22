import React from 'react'
import { render, fireEvent, screen } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
import initialState from '../../stateManagement/initialState'

test('Renders <App /> with connected state', () => {
  render(<App />, {initialState})
  const app = screen.getByTestId('app')
  expect(app).toBeInTheDocument()
})

test('Renders <AppHeader /> with Nav Links', () => {
  render(<App />, {initialState})
  const appTitle = screen.getByRole('heading', {name: 'SubFinder'})
  const homeLink = screen.getByRole('link', {name: 'Home'})
  const aboutLink = screen.getByRole('link', {name: 'About'})

  expect(appTitle).toBeInTheDocument()
  expect(homeLink).toBeInTheDocument()
  expect(aboutLink).toBeInTheDocument()
})

test('Renders <SearchHistory />', () => {
  render(<App />, {initialState})
  const searchHistoryComponent = screen.getByTestId('searchHistory')
  const searchHistoryTitle = screen.getByRole('heading', {name: 'Search History'})
  
  expect(searchHistoryComponent).toBeInTheDocument()
  expect(searchHistoryTitle).toBeInTheDocument()
})

test('Renders <Form /> with Email Input', () => {
  render(<App />, {initialState})
  const form = screen.getByTestId('form')
  const emailInput = screen.getByLabelText('*Subscriber Email Address')
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  expect(form).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
})

test('Does not render <FormResult /> on initial render', () => {
  render(<App />, {initialState})
  const formResult = screen.queryByTestId('formResult')

  expect(formResult).not.toBeInTheDocument()
})

test('Renders <FormResult /> after "Find Subscriber" Job is added to State', () => {
  let state = {
    input: 'balwill@bu.edu',
    inputSubmitted: 'balwill@bu.edu',
    currentJobId: '34',
    error: {},
    findSubscriberJobs: [
      {
        id: '34',
        timeSubmitted: '2021-03-19T02:39:49.232Z',
        inputSubmitted: 'balwill@bu.edu',
        state: 'waiting'
      }
    ],
    _persist: {
      version: -1,
      rehydrated: true
    }
  }
  
  render(<App />, { initialState: state })

  const formResult = screen.queryByTestId('formResult')

  expect(formResult).toBeInTheDocument()
})

test('Does not render <ErrorAlert /> on initial render', () => {
  render(<App />, { initialState })

  const errorAlert = screen.queryByRole('heading', {name: 'Error'})

  expect(errorAlert).not.toBeInTheDocument()
})

test('Renders <ErrorAlert /> when Error prop is populated', () => {
  let state = {
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
  
  render(<App />, { initialState: state })

  const errorAlert = screen.getByRole('heading', {name: 'Error: Request failed with status code 504'})

  expect(errorAlert).toBeInTheDocument()

})
