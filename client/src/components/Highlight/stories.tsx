import { Story, Meta } from '@storybook/react'
import Highlight, { HighlightProps } from '.'

export default {
  title: 'Highlight',
  component: Highlight,
  args: {
    title: "Read Dead It's back",
    subtitle: "Come see John's new adventures",
    buttonLabel: 'Buy Now',
    buttonLink: '/rdr2'
  }
} as Meta

export const Default: Story<HighlightProps> = (args) => <Highlight {...args} />
