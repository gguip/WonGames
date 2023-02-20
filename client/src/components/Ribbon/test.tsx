import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Ribbon from '.'

describe('<Ribbon />', () => {
  it('should render the text correctly', () => {
    renderWithTheme(<Ribbon>Best Seller</Ribbon>)

    expect(screen.getByText(/Best Seller/i)).toBeInTheDocument()
  })

  it('should render with the primary color', () => {
    renderWithTheme(<Ribbon>Best Seller</Ribbon>)

    expect(screen.getByTestId('Ribbon-component')).toHaveStyle({
      backgroundColor: '#F231A5'
    })
  })

  it('should render with the secondary color', () => {
    renderWithTheme(<Ribbon color="secondary">Best Seller</Ribbon>)

    expect(screen.getByTestId('Ribbon-component')).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })
  })

  it('should render with the normal font size as default', () => {
    renderWithTheme(<Ribbon size="normal">Best Seller</Ribbon>)

    expect(screen.getByTestId('Ribbon-component')).toHaveStyle({
      height: '3.6rem',
      fontSize: '1.4rem'
    })
  })

  it('should render with the smal font size', () => {
    renderWithTheme(<Ribbon size="small">Best Seller</Ribbon>)

    expect(screen.getByTestId('Ribbon-component')).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
