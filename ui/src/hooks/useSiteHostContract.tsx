import { useCallback } from 'react';
import SiteHostContract from '../assets/SiteHost.json';
import { useWeb3Context } from '../contexts/Web3Context';
import { useContract } from './useContract';

export const useSiteHostContract = () => {
  const { account } = useWeb3Context();
  const { contract } = useContract(SiteHostContract);

  const getSites = useCallback(async () => {
    if (!contract) return [];
    if (!account) throw new Error('Not signed in with MetaMask!');
    try {
      const sites = await contract.methods
        .getSites()
        .call({ from: account });
      return sites;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [contract, account]);

  const uploadSite = useCallback(
    async (token: string) => {
      if (!contract) throw new Error('Contract not defined');
      if (!account) throw new Error('Not signed in with MetaMask!');
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

  return { getSites, uploadSite };
};
