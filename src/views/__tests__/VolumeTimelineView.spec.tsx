import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../setupTests'
import VolumeTimelineView from '../VolumeTimelineView'

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<VolumeTimelineView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
