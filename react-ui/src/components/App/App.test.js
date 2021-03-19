import React from 'react'
import { render, fireEvent, screen } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
import initialState from '../../stateManagement/initialState'

test('Renders <App /> with connected state', () => {
  render(<App />, initialState)
  const app = screen.getByTestId('app')
  expect(app).toBeInTheDocument()
})

test('Renders <AppHeader /> with Nav Links', () => {
  render(<App />, initialState)
  const appTitle = screen.getByRole('heading', {name: 'SubFinder'})
  const homeLink = screen.getByRole('link', {name: 'Home'})
  const aboutLink = screen.getByRole('link', {name: 'About'})

  expect(appTitle).toBeInTheDocument()
  expect(homeLink).toBeInTheDocument()
  expect(aboutLink).toBeInTheDocument()
})

test('Renders <SearchHistory />', () => {
  render(<App />, initialState)
  const searchHistoryComponent = screen.getByTestId('searchHistory')
  const searchHistoryTitle = screen.getByRole('heading', {name: 'Search History'})
  
  expect(searchHistoryComponent).toBeInTheDocument()
  expect(searchHistoryTitle).toBeInTheDocument()
})

test('Renders <Form /> with Email Input', () => {
  render(<App />, initialState)
  const form = screen.getByTestId('form')
  const emailInput = screen.getByLabelText('*Subscriber Email Address')
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  expect(form).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
})

test('Does not render <FormResult /> on first render', () => {
  render(<App />, initialState)
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

