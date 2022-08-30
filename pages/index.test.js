import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as useStudies from '@hooks/use-studies'
import Home from './index'

describe('index tests', () => {
  it('list studies', () => {
    // Setup
    const mockStudies = [
      { name: 'study 1', key: 'abcdef' },
      { name: 'study 2', key: 'ghijk' },
      { name: 'study 3', key: 'lmnop' },
    ]
    jest.spyOn(useStudies, 'default').mockReturnValue({ studies: mockStudies })

    // Execute
    render(<Home />)

    // Assert
    expect.assertions(mockStudies.length * 2)
    mockStudies.forEach((study) => {
      expect(screen.getByText(`Study: ${study.name}`)).toBeInTheDocument()
      expect(screen.getByText(`Key: ${study.key}`)).toBeInTheDocument()
    })
  })

  it('create study', () => {
    // Setup
    const newStudy = 'test study'

    // Execute
    render(<Home />)
    userEvent.type(screen.getByRole('textbox'), newStudy)
    userEvent.click(screen.getByRole('button', { name: 'Create study' }))

    // Assert
    expect.assertions(1)
    expect(screen.getByRole('textbox')).toContainHTML('')
  })

  it('no studies', () => {
    // Setup
    jest.spyOn(useStudies, 'default').mockReturnValue({ studies: [] })

    // Execute
    render(<Home />)

    // Assert
    expect.assertions(1)
    expect(screen.getByText('No studies found.')).toBeInTheDocument()
  })

  it('loading', () => {
    // Setup
    jest.spyOn(useStudies, 'default').mockReturnValue({ isLoading: true })

    // Execute
    render(<Home />)

    // Assert
    expect.assertions(1)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('error', () => {
    // Setup
    jest.spyOn(useStudies, 'default').mockReturnValue({ isError: true })

    // Execute
    render(<Home />)

    // Assert
    expect.assertions(1)
    expect(screen.getByText('Something went wrong!!')).toBeInTheDocument()
  })
})
