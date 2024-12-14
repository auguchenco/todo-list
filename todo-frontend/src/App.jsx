import { BrowserRouter } from "react-router-dom"
import PublicRoutes from "./routes/public.routes"
import { UtilsProvider } from "./context/Utils"

function App() {

  return (
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <UtilsProvider>
        <PublicRoutes />
      </UtilsProvider>
    </BrowserRouter>
  )
}

export default App