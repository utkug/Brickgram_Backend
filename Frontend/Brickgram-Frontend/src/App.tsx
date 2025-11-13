import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChooseAvatar from "./pages/ChooseAvatar";
import UserProfile from "./pages/UserProfile";
import MainPage from "./pages/MainPage";
import MyPendingList from "./pages/MyPendingList";
import DefaultLayout from "./layouts/DefaultLayout";
import PostDetails from "./pages/PostDetails";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <Routes>
      <Route element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } path="/" />
      <Route element={<DefaultLayout children={<MainPage />}  />} path="/home" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<ChooseAvatar />} path="/avatar" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<UserProfile />} path="/profile/:username" />
      <Route element={<MyPendingList/>} path="/follow-requests" />
      {/* <Route element={<DefaultLayout/>} path="/default" /> */}
      <Route element={<DefaultLayout children={<PostDetails />} />} path="/post/:postId" />
      <Route element={<DefaultLayout children={<NotificationsPage />} />} path="/notifications" />
    </Routes>
  );
}

export default App;
