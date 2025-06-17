import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import NotFound404 from "./NotFound404";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user_token = localStorage.getItem("sp_token");
    
    if (!user_token && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
