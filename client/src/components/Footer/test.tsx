import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Footer from '.'

describe('<Footer />', () => {
  it('should render 4 columns topcis', () => {
    renderWithTheme(<Footer />)

    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })
})
