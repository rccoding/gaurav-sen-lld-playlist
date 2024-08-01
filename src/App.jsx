import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Game from './All Assessment/tic-tac-toe/TickTacToe'
import Home from './Home'


function PageViewTracker() {
  const location = useLocation();



  return null;
}


const App = () => {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
