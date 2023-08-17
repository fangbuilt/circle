import { useState, ChangeEvent } from "react";
import { ThreadPost } from "../../../interfaces/featureInterfaces";
import { API } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export default function usePostThread() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ThreadPost>({
    content: "",
    image: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  async function handlePost() {
    try {
      const response = await API.post("/thread", form)
      console.log(response)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return { handleChange, handlePost }
}