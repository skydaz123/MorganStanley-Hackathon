import React from 'react'
import { render, screen } from '@testing-library/react'
import BigLoader from "./index"

test('renders big loader', () => {
    render(<BigLoader/>)
    const linkElement = screen.getByText(/loading/i)
    expect(linkElement).toBeInTheDocument()
})
