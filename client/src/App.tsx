import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home, { ObserveThread } from "./pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ObserveThread />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
