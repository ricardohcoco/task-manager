import { useState, useCallback } from 'react';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Register from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <Register
          onGoToLogin={() => setShowRegister(false)}
        />
      );
    }
    return ( 
    <Login 
      onLogin={handleLogin} 
      onGoToRegister={() => setShowRegister(true)}
    />
    );
  }

  return <Tasks onLogout={handleLogout} />;
}

export default App;
