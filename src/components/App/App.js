import React from 'react'
import tw from 'twin.macro'
import Button  from '../Button'

// import logo from '../assets/images/logo.svg';
// import '../assets/css/App.css';

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }) => [
    tw`tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen`,
    hasBackground && tw`tw-bg-gradient-to-b tw-from-primary-blue tw-to-blue-200 `,
  ],
}

const App = () => (
  <div css={styles.container({ hasBackground: true })}>
    <div tw="tw-flex tw-flex-col tw-justify-center tw-h-full tw-gap-y-5">
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
      <Button isSmall>Close</Button>
      <button className="tw-text-primary-blue">Test blue</button>
    </div>
  </div>
)

export default App
