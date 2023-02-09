import { render, screen } from '@testing-library/react'

import Footer from '.'

describe('<Footer />', () => {
  it('should render 4 columns topcis', () => {
    render(<Footer />)

    expect(
      screen.getByRole('heading', { name: /Contact/i })
    ).toBeInTheDocument()
  })
})
