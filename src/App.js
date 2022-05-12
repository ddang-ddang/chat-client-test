import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import LandingPage from './Pages/LandingPage';
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
            type="text/css"
            rel="stylesheet"
        />
        <link href="/style.css" type="text/css" rel="stylesheet" />
        <script
            src="https://cdn.socket.io/3.1.3/socket.io.min.js"
            integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
            crossorigin="anonymous"
        ></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </Helmet>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}/>
          <Route exact path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
