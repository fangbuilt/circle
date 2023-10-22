import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AUTH_CHECK, AUTH_ERROR } from "../stores/rootReducer"
import { API, setAuthToken } from "../lib/api"

export default function useCheckAuth() {
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function checkAuth() {
    try {
      const response = await API.get("/auth/check")
      const data = response.data
      console.log(data.id)
      dispatch(AUTH_CHECK(data))
      setIsAuthLoading(false)
    } catch (error) {
      dispatch(AUTH_ERROR())
      setIsAuthLoading(false)
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
      setIsAuthLoading(false)
    }
    handleAuth()
  }, [])

  return {
    isAuthLoading
  }
}