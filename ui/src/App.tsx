import { ParticleBg } from './components/ParticleBg';
import Menu from './components/Menu';
import GhostLogo from './assets/GhostLogo.svg';
import './App.css';

function App() {
  return (
    <div>
      <ParticleBg />
      <img src={GhostLogo} className="Logo" alt="Ghost Logo" />
      <Menu />
    </div>
  );
}

export default App;
