import { useState, ChangeEvent } from "react";
import { Register } from "../../../interfaces/authInterfaces";
import { API } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Register>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  async function handleRegister() {
    try {
      const response = await API.post("/auth/register", form)
      console.log(response)
      navigate("/auth/login")
    } catch (error) {
      console.log(error)
    }
  }

  return { handleChange, handleRegister }
}