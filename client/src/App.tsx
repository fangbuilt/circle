import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home, { ObserveThread } from "./pages/Home"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ObserveThread />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
