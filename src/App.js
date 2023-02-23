import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Play from './components/Play/Play';
import React, { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import CreateAccount from './components/auth/CreateAccount';
import { auth } from './firebase';
import Login from './components/auth/Login';

export const UserContext = createContext();
const App = () => {
  const [user, setUser] = useState();
  onAuthStateChanged(auth, (user) => setUser(user));
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/wheres-waldo-app/" element={<Home />} />
          <Route path="/wheres-waldo-app/play/:id" element={<Play />} />
          <Route
            path="/wheres-waldo-app/leaderboard/:id"
            element={<Leaderboard />}
          />
          <Route path="/wheres-waldo-app/login" element={<Login />} />
          <Route
            path="/wheres-waldo-app/create-account"
            element={<CreateAccount />}
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
