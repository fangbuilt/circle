import { useState, ChangeEvent } from "react";
import { Login } from "../../../interfaces/authInterfaces";
import { API } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../../../stores/rootReducer";

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      dispatch(AUTH_LOGIN(response.data))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return { handleChange, handleLogin }
}