import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import LandingPage from './Pages/LandingPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/chat/:userId/:nickname/:roomName" element={<ChatPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
