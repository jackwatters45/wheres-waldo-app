import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import rocketImage from './assets/waldoScenes/rocketScene.jpg';
import unScene from './assets/waldoScenes/unScene.jpg';
import dnaScene from './assets/waldoScenes/dnaScene.jpg';
import Play from './components/Play';

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  //  100px 0 100px;
  // gap: 50px;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/rocket" element={<Play img={rocketImage} />} />
          <Route path="/play/dna" element={<Play img={dnaScene} />} />
          <Route path="/play/united-nations" element={<Play img={unScene} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

// TODO gonna have to add the where's waldo slug to all of these
export default App;
