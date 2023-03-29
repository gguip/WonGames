import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/1042x580',
  price: 'R$ 235,00'
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByTestId('GameCard')).toBeInTheDocument()
  })

  it('should render title correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByText(/Population Zero/i)).toBeInTheDocument()
  })

  it('should render developer correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByText(/Rockstar Games/i)).toBeInTheDocument()
  })

  it('should render image correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should render price correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByText(/235,00/i)).toBeInTheDocument()
  })
})
