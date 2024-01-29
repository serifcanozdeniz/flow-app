import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage/index";
import Login from "./Pages/Login/index";
import Register from "./Pages/Register/index";
import Header from "./components/Header";
import Layout from "./Pages/Layout";
import ProfileInfo from "./components/ProfileInfo";
import ProfilePage from "./Pages/Profile";
import ResetModal from "./Pages/Profile/ResetModal";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/detay" element={<h1>Blog Detay Sayfası</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};
export default App;
