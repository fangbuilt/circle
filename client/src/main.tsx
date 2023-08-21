import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootReducer from './stores/rootReducer'
import { configureStore } from "@reduxjs/toolkit"
import Theme from './utils/Theme.ts'
import ScrollToTop from './utils/ScrollToTop.ts'

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <BrowserRouter>
      <ScrollToTop />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
