import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";

function App() {
  return (
    <Routes>
      <Route element={<Index />} path="/" />
    </Routes>
  );
}

export default App;
