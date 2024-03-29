import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Heading from '.'

describe('<Heading />', () => {
  it('should render a white heading by default', () => {
    renderWithTheme(<Heading>won games</Heading>)

    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black heading when color is passed', () => {
    renderWithTheme(<Heading color="black">Won Games</Heading>)

    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a heading with line to the left side', () => {
    renderWithTheme(<Heading lineLeft>Won Games</Heading>)

    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'border-left': '0.7rem solid #F231A5'
    })
  })

  // it('should render a heading with a line at the bottom', () => {
  //   renderWithTheme(<Heading lineBottom>Won Games</Heading>)

  //   expect(screen.getByTestId('Heading component')).toHaveStyleRule(
  //     'border',
  //     '0.5rem solid #F231A5',
  //     {
  //       modifier: ':after'
  //     }
  //   )
  // })
})

it('should render a heading with a small size', () => {
  renderWithTheme(<Heading size="small">Won Games</Heading>)

  expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
    'font-size': '1.6rem'
  })

  expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyleRule(
    'width',
    '2rem',
    {
      modifier: '::after'
    }
  )
})
