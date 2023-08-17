import { Route, Routes, useNavigate } from "react-router-dom"
import { Home, ObserveThread } from "./pages/Home"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Register, Login } from "./pages/Auth"
import { API, setAuthToken } from "./lib/api"
import React, { useEffect, useState } from "react"
import Loading from "./components/Loading"
import { useDispatch } from "react-redux"
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer"

const queryClient = new QueryClient()

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function checkAuth() {
    try {
      const response = await API.get("/auth/check")
      dispatch(AUTH_CHECK(response.data))
      setIsLoading(false)
    } catch (error) {
      dispatch(AUTH_ERROR())
      setIsLoading(false)
      navigate("/auth/login")
    }
  }

  useEffect(() => {
    async function handleAuth() {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
        try {
          await checkAuth()
        } catch (error) {
          console.log("goblok")
        }
      }
      setIsLoading(false)
    }
    handleAuth()
  }, [])

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thread/:id" element={<ObserveThread />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </QueryClientProvider>
      )}
    </React.Fragment>
  )
}

export default App
