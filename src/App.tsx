import { useCallback, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Container, Engine } from 'tsparticles-engine';
import { ParticleBg } from './components/ParticleBg';

function App() {
  return <ParticleBg />;
}

export default App;
