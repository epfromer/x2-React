import { createAction, createSlice, Store } from '@reduxjs/toolkit'

// TODO - don't think this is needed with auth0
export interface AuthenticationState {
  authenticated: boolean
  username: string
}
const initialState: AuthenticationState = {
  authenticated: false,
  username: '',
}

// Actions
export const setAuthenticated = createAction<boolean>(
  'authentication/setAuthenticated'
)
export const setUsername = createAction<string>('authentication/setUsername')

// Reducer
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthenticated, (state, action) => {
        state.authenticated = action.payload
      })
      .addCase(setUsername, (state, action) => {
        state.username = action.payload
      })
  },
})
export default authenticationSlice.reducer

// selectors & getters
export const getAuthenticated = (state: {
  authentication: { authenticated: boolean }
}): boolean => state.authentication.authenticated
export const getUsername = (state: {
  authentication: { username: string }
}): string => state.authentication.username

export function signOut(store: Store): void {
  store.dispatch(setAuthenticated(false))
  store.dispatch(setUsername(''))
}
