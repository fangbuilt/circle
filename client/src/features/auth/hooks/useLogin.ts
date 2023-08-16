import { useState, ChangeEvent } from "react";
import { Login } from "../types/Interfaces";
import { API } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Login>({
    email: "",
    password: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  async function handleLogin() {
    try {
      const response = await API.post("/auth/login", form)
      localStorage.setItem("token", response.data.token)
      console.log(response)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return { handleChange, handleLogin }
}