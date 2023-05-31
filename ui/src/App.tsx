import { Button } from '@mui/material';
import { useCallback } from 'react';

import { ParticleBg } from './components/ParticleBg';
import Menu from './components/Menu';
import { supabase } from './constants/supabase';
import GhostLogo from './assets/GhostLogo.svg';
import { useMetamask } from './hooks/useMetamask';
import './App.css';

function App() {
  const { account } = useMetamask();

  const uploadSite = useCallback(
    async (site_token: string) => {
      if (!account) throw new Error('MetaMask Account not found');
      const { data, error } = await supabase
        .from('sites')
        .insert({ account, site_token });
      if (error) throw new Error('Failed to upload site.');
      return data;
    },
    [account],
  );

  const getSites = useCallback(async () => {
    if (!account) throw new Error('MetaMask Account not found');
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('account', account)
      .order('created_at', { ascending: false });
    if (error) throw new Error('Failed to get your sites.');
    return data;
  }, [account]);

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
