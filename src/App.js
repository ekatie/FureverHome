import './app.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import RoutesComponent from './routes';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <RoutesComponent />
        <Footer />
      </Router>
    </div>
  );
}

export default App;


{/* Users (2 types – adopters and admin)
o	GET - /Users/new
	Form to create new user
o	POST – /Users
	Create new user
o	GET - /Login
	Form to log in
o	POST - /Login
	Authenticate and log in user
o	POST - /Logout
	Logout a user
o	GET - /Users/:id/profile
	Form to edit user profile
o	PUT - /Users/:id/profile
	Update user profile
Applications
o	GET - /Application/new
	Form to create a new application
o	GET - /Applications (admin)
	To view all applications, allowing admin users to review and manage applications in various stages.
o	POST - /Applications
	Submit a new application
o	GET - /Application/:id
	View a specific application’s details
o	POST - /Applications/:id/cancel
	Allow adopters to cancel their application.
o	POST - /Applications/:id/select-match
	For adopters to select a dog from matches to move forward with the application.
o	POST - /Applications/:id/schedule/interview
	Schedule an interview
o	POST - /Applications/:id/schedule/virtual-meet-greet
	Schedule a virtual meet & greet
o	POST - /Applications/:id/schedule/adoption-day
	Schedule the adoption day
o	GET - /Applications/:id/matches
	View dog matches for the application based on the matching criteria
Dogs
o	GET - /Dogs/new (admin)
	Form to add new dog
o	POST - /Dogs (admin)
	Submit a new dog
o	GET - /Dogs
	View all dogs
o	GET - /Dogs/:id/edit (admin)
	Form to edit a dog’s details
o	PUT - /Dogs/:id/edit (admin)
	Update a dog’s details
o	GET - /Dogs/favourites
	View logged in user’s favourite dogs
o	GET - /Dogs/:id
	View a specific dog’s details
o	POST - /Dogs/:id/favourite
	Toggle the favourite status of a dog for the logged-in user, combining the creation and deletion of favourites into one action based on current state. */}