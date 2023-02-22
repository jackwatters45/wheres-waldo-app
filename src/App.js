import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Play from './components/Play/Play';
import React, { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthForm from './auth/AuthForm';
import { auth } from './firebase';

export const UserContext = createContext();
const App = () => {
  const [user, setUser] = useState();
  onAuthStateChanged(auth, (user) => setUser(user));

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/login" element={<AuthForm />} />
          {/* TODO */}
          <Route path="/sign-in" element={<AuthForm />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

// TODO gonna have to add the where's waldo slug to all of these
export default App;
