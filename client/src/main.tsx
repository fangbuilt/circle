import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootReducer from './stores/rootReducer'
import { configureStore } from "@reduxjs/toolkit"
// import { initialAuthState } from './stores/slices/authSlice.ts'

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: {
  //   auth: {
  //     ...initialAuthState,
  //     token: localStorage.getItem("token") || null
  //   }
  // }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
