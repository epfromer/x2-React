import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import UserSettingsMenu from '../UserSettingsMenu'

test('renders', async () => {
  const { getByTestId } = renderComp(<UserSettingsMenu />)
  let button = getByTestId('sign-out')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
