import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Play from './components/Play/Play';
import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import CreateAccount from './components/auth/CreateAccount';
import { auth } from './firebase';
import Login from './components/auth/Login';

export const UserContext = createContext();
const App = () => {
  const [user, setUser] = useState();
  onAuthStateChanged(auth, (user) => setUser(user));

  useEffect(()=> console.log(user), [user])
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

// TODO gonna have to add the where's waldo slug to all of these
export default App;
