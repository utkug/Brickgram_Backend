import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
