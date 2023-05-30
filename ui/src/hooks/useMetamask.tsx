import { useState, useEffect } from 'react';

export const requestAccount = async () => {
  const accounts = await window?.ethereum?.request({
    method: 'eth_requestAccounts',
  });
  return accounts?.[0];
};

export function useMetamask() {
  const [account, setAccount] = useState('');
  const [error, setError] = useState<Error>();

  useEffect(() => {
    requestAccount().then(setAccount).catch(setError);
  }, []);

  return { account, error };
}
