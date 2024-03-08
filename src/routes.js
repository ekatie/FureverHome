import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import DogDetails from './components/DogDetails/DogDetails';
import DogList from './components/DogList/DogList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/application" element={<ApplicationForm />} />
      <Route path="/dogs/:id" element={<DogDetails />} />
      <Route path="/dogs" element={<DogList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default RoutesComponent;

// Dynamic Routing:
// Use the services directory to manage API calls to your Rails backend. Components that correspond to routes can use these services to fetch or manipulate data.

// Protected Routes:
// For routes that require authentication (e.g., user profile, admin dashboard), consider implementing protected routes that check for user authentication status and redirect if necessary.

// Link Components:
// Use Link from react-router-dom to navigate your application without reloading the page, providing a smooth user experience.

// React Router Best Practices
// Lazy Loading: Use React.lazy for lazy loading components on routes. This improves the initial load time of your app.
// 404 Page: Include a catch-all route to display a 404 page for unmatched routes.
// Nested Routes: Utilize nested routes to reflect the hierarchy in your UI, making it easier to manage complex layouts.