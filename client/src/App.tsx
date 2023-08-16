import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, ObserveThread } from "./pages/Home"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Register, Login } from "./pages/Auth"
import { setAuthToken } from "./lib/api"
import React, { useEffect, useState } from "react"
import Loading from "./components/Loading"

const queryClient = new QueryClient

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function checkAuth() {
    setAuthToken(localStorage.token)
    setIsLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <React.Fragment>
      {isLoading ? (
      <Loading />
     ) : (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thread/:id" element={<ObserveThread />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
     ) }
    </React.Fragment>
  )
}

export default App
