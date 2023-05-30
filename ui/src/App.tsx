import { Button } from '@mui/material';
import { useCallback } from 'react';

import { ParticleBg } from './components/ParticleBg';
import Menu from './components/Menu';
import GhostLogo from './assets/GhostLogo.svg';
import { useMetamask } from './hooks/useMetamask';
import { useContract } from './hooks/useContract';
import './App.css';

function App() {
  const { account } = useMetamask();
  const { contract } = useContract();

  const getSites = useCallback(async () => {
    if (!contract) throw new Error('Contract not defined');
    try {
      const sites = await contract.methods
        .getSites()
        .call({ from: account });
      return sites;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to execute smart contract', contract);
    }
  }, [contract, account]);

  const uploadSite = useCallback(
    async (token: string) => {
      if (!contract) throw new Error('Contract not defined');
      try {
        await contract.methods
          .uploadSite(token)
          .send({ from: account });
      } catch (err) {
        console.error(err);
        throw new Error('Failed to execute smart contract');
      }
    },
    [contract, account],
  );

  return (
    <div>
      <ParticleBg />
      <img src={GhostLogo} className="Logo" alt="Ghost Logo" />
      <Menu />
      <Button onClick={async () => console.log(await getSites())}>
        Get Sites
      </Button>
      <Button
        onClick={async () =>
          console.log(
            await uploadSite((Math.random() * 1000000).toString()),
          )
        }
      >
        Upload Site
      </Button>
    </div>
  );
}

export default App;
