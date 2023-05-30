import { useEffect, useState } from 'react';
import SiteHostContract from '../../../blockchain/build/contracts/SiteHost.json';
import { useWeb3Context } from '../contexts/Web3Context';

export const useContract = (contractAbi: any = SiteHostContract) => {
  const { web3 } = useWeb3Context();
  const [contract, setContract] = useState<any>();

  useEffect(() => {
    const setupContract = async () => {
      if (!web3) return;
      const netId = await web3.eth.net.getId();
      const network = contractAbi.networks[netId];
      const instance = new web3.eth.Contract(
        contractAbi.abi,
        network && network.address,
      );
      setContract(instance);
    };
    setupContract();
  }, [web3, contractAbi]);

  return { contract };
};
