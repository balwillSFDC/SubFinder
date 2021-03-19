import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import About from './About'

test('renders without crashing', () => {
  render(<About />)
  const aboutElement = screen.getByTestId('about-page')
  expect(aboutElement).toBeInTheDocument()
})
