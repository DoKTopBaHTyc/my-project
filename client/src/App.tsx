import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import AirPage from "./components/pages/AirPage"
import MainPage from "./components/pages/MainPage"
import NavBar from "./components/ui/NavBar"
import WaterPage from "./components/pages/WaterPage"
import EarthPage from "./components/pages/EarthPage"
function App(): React.JSX.Element {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/air" element={<AirPage/>} />
          <Route path="/water" element={<WaterPage/>} />
          <Route path="/earth" element={<EarthPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;