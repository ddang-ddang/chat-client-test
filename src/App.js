import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import ChatPage from './Components/ChatPage';
import LandingPage from './Pages/LandingPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/chat/:userId/:nickname/:roomId/:roomName" element={<ChatPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
