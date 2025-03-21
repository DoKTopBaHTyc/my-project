import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AirPage from './components/pages/AirPage';
import MainPage from './components/pages/MainPage';
import NavBar from './components/ui/NavBar';
import WaterPage from './components/pages/WaterPage';
import EarthPage from './components/pages/EarthPage';
import { NotFound } from './components/pages/NotFound';

function App(): React.JSX.Element {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/air" element={<AirPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/earth" element={<EarthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
