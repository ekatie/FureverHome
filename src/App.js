import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/authSlice';
import API, { setAuthToken } from './services/api';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import RoutesComponent from './routes';

import './app.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreState = async () => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (authTokens && authTokens["access-token"] && userData) {
        setAuthToken(authTokens["access-token"]);
        dispatch(login({ user: userData, token: authTokens["access-token"] }));

        try {
          await API.get("/auth/validate_token");
        } catch (error) {
          console.error("Token validation error:", error);
          localStorage.removeItem("authTokens");
          dispatch(logout());
          setAuthToken(null);
        }
      } else {
        dispatch(logout());
        setAuthToken(null);
      }
    };

    restoreState();
  }, [dispatch]);

  return (
    <div className="App">
      <NavigationBar />
      <RoutesComponent />
      <Footer />
    </div>
  );
}

export default App;