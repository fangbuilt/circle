import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../stores/rootReducer";

export default function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(AUTH_LOGOUT())
    navigate("/auth/login")
  }

  return { handleLogout }
}