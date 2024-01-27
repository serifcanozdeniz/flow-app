import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage/index";
import Login from "./Pages/Login/index";
import Register from "./Pages/Register/index";
import Header from "./components/Header";
import Layout from "./Pages/Layout";
import ProfileInfo from "./components/ProfileInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/detay" element={<MainPage />} />
        <Route path="/profile" element={<MainPage />} />
      </Route>
    </Routes>
  );
};
export default App;
