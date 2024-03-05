import './app.scss';
import React from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import RoutesComponent from './routes';

function App() {
  return (
    <div className="App">
        <NavigationBar />
        <RoutesComponent />
        <Footer />
    </div>
  );
}

export default App;