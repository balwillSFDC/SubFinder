import React from 'react'
import { render, fireEvent, screen } from '../../test-helpers/test-utils.js'
import '@testing-library/jest-dom/extend-expect'
import AppHeader from './AppHeader'
import initialState from '../../stateManagement/initialState'
import { MemoryRouter } from 'react-router-dom'

test('Renders without crashing', () => {
  render(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>, 
    initialState
  )

  const appHeader = screen.getByTestId('appHeader')

  expect(appHeader).toBeInTheDocument()
})

test('Renders with "SubFinder" title and Links', () => {
  render(
    <MemoryRouter>
      <AppHeader />
    </MemoryRouter>, 
    initialState
  )
    
  const appTitle = screen.getByRole('heading', {name: 'SubFinder'})
  const homeLink = screen.getByRole('link', {name: 'Home'})
  const aboutLink = screen.getByRole('link', {name: 'About'})

  expect(appTitle).toBeInTheDocument()
  expect(homeLink).toBeInTheDocument()
  expect(aboutLink).toBeInTheDocument()
})