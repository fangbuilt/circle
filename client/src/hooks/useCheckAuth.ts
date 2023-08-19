import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AUTH_CHECK, AUTH_ERROR } from "../stores/rootReducer"
import { API, setAuthToken } from "../lib/api"

export default function useCheckAuth() {
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
          console.log({ error })
        }
      }
      setIsLoading(false)
    }
    handleAuth()
  }, [])

  return { isLoading }
}