import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logoutUser } from './features/authSlice';
import API, { setAuthToken } from './services/api';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import RoutesComponent from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreState = async () => {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (authTokens && authTokens.token && userData) {
        setAuthToken(authTokens.token);
        dispatch(login({ user: userData, token: authTokens.token }));

        try {
          await API.get("/auth/validate_token");
        } catch (error) {
          console.error("Token validation error:", error);
          localStorage.removeItem("authTokens");
          dispatch(logoutUser());
          setAuthToken(null);
        }
      } else {
        dispatch(logoutUser());
        setAuthToken(null);
      }
    };

    restoreState();
  }, [dispatch]);

  return (
    <div className="App site-container">
      <div className="content-wrap">
        <NavigationBar />
        <RoutesComponent />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;