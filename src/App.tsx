import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';

function App() {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    console.log('Déconnexion');
  };

  return (
    <Layout 
      onCategorySelect={handleCategorySelect}
      onProfileClick={handleProfileClick}
      onLogoutClick={handleLogoutClick}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Layout>
  );
}

export default App
