import tw, { styled, css, theme } from 'twin.macro'

const Button = styled.button(({ variant, isSmall }) => [
  // The common button styles added with the tw import
  tw`tw-px-8 tw-py-2 tw-rounded focus:tw-outline-none tw-transform tw-duration-75`,

  // Use the variant grouping feature to add variants to multiple classes
  tw`hocus:(tw-scale-105 tw-text-yellow-400)`,

  // Use props to conditionally style your components
  variant === 'primary' && tw`tw-bg-black tw-text-white tw-border-black`,

  // Combine regular css with tailwind classes within backticks
  variant === 'secondary' && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`tw-border-2 tw-border-yellow-600`,
  ],

  // Conditional props can be used
  isSmall ? tw`tw-text-sm` : tw`tw-text-lg`,

  // The theme import can supply values from your tailwind.config.js
  css`
    color: ${theme`colors.white`};
  `,
])

export default Button
