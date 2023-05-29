import { ParticleBg } from './components/ParticleBg';
import './App.css';
import Menu from './components/Menu';
import GhostLogo from './assets/GhostLogo.svg'

function App() {
  return (
    <div>
      <ParticleBg />
      <img src={GhostLogo} className='Logo' alt="Ghost Logo" />
      <Menu />
    </div>
  );
}

export default App;
