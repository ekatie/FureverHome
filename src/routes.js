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
import AdminApplicationList from './components/AdminApplicationList/AdminApplicationList';
import AdminDogList from './components/AdminDogList/AdminDogList';
import AdminEditDog from './components/AdminEditDog/AdminEditDog';
import AdminApplicationDetails from './components/AdminApplicationDetails/AdminApplicationDetails';
import AdoptionContract from './components/AdoptionContract/AdoptionContract';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/application" element={<ApplicationForm />} />
      <Route path="/adoption-contract/:applicationId" element={<AdoptionContract />} />
      <Route path="/dogs/:id" element={<DogDetails />} />
      <Route path="/dogs" element={<DogList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<AdminApplicationList />} />
      <Route path="/admin/dogs" element={<AdminDogList />} />
      <Route path="/admin/dogs/new" element={<AdminEditDog />} />
      <Route path="/admin/dogs/:id" element={<AdminEditDog />} />
      <Route path="/admin/applications/:id" element={<AdminApplicationDetails />} />
    </Routes>
  );
};

export default RoutesComponent;