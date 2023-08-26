import { useState, ChangeEvent, FormEvent } from "react";
import { ThreadPost } from "../../../interfaces/featureInterfaces";
import { API, setAuthToken } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function usePostThread() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const navigate = useNavigate()

  const [form, setForm] = useState<ThreadPost>({
    content: "",
    image: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    if (event.target instanceof HTMLInputElement && event.target.type === "file") {
      const files = event.target.files
      if (files && files.length > 0) {
        const file = files[0]
        setForm({
          ...form,
          [name]: file
        })
        setPreview(URL.createObjectURL(file))
      }
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  function cancelPreview() {
    setForm({
      ...form,
      image: undefined
    })
    setPreview(null)
  }

  const [loading, setLoading] = useState(false)

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("content", form.content)
      formData.append("image", form.image as File)
      setAuthToken(localStorage.token)
      await API.post("/thread", formData)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return {
    handleChange,
    handlePost,
    handleClick,
    inputRef,
    loading,
    preview,
    cancelPreview
  }
}