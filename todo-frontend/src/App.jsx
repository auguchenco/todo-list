import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/public.routes";
import PrivateRoutes from "./routes/private.routes";
import { useUtils } from "./context/Utils";

function App() {
  const { state } = useUtils();
  console.log(state);
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <PublicRoutes />
      {state.token && <PrivateRoutes />}
    </BrowserRouter>
  );
}

export default App;
