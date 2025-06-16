
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound404 from './Pages/NotFound404/NotFound404';
import LoginPage from './Pages/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';

import './App.css';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = checkAuth();
//   const location = useLocation();
//   const fpType = localStorage.getItem('sp_type');

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   const allowedLinks = permissions[fpType]?.links.map(link => link.key) || [];
//   const currentPath = location.pathname.replace('/', '');
//   const isPathAllowed = allowedLinks.some(link => currentPath.startsWith(link));

//   if (allowedLinks.length > 0 && !isPathAllowed && currentPath !== '') {
//     return <Navigate to="/not-found" replace />;
//   }

//   return children;
// };

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="*" element={<NotFound404  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
