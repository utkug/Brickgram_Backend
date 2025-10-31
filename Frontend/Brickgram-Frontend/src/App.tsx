import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChooseAvatar from "./pages/ChooseAvatar";
import UserProfile from "./pages/UserProfile";
import MainPage from "./pages/MainPage";
import MyPendingList from "./pages/MyPendingList";

function App() {
  return (
    <Routes>
      <Route element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } path="/" />
      <Route element={<MainPage />} path="/main" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<ChooseAvatar />} path="/avatar" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<UserProfile />} path="/profile/:username" />
      <Route element={<MyPendingList/>} path="/follow-requests" />
    </Routes>
  );
}

export default App;
