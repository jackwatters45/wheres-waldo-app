import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Play from './components/Play/Play';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:id" element={<Play />} />
      <Route path="/leaderboard/:id" element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>
);

// TODO gonna have to add the where's waldo slug to all of these
export default App;
