import { MemoryRouter } from 'react-router-dom'
import APP from '../App'
import { render, cleanup, within } from '@testing-library/react'
import { vi } from 'vitest'
import { fakeHttpHandler } from './fake-http-handler'
vi.useFakeTimers()
window.fetch = fakeHttpHandler
export const createAppContext = () => {
    const container = render(<MemoryRouter>
        <APP />
    </MemoryRouter>)
    const inSideBar = () => {
        return within(container.getByTestId('side-bar'))
    }
    return {
        container,
        inSideBar,
        cleanup,
    }
}
export type AppContext = ReturnType<typeof createAppContext>