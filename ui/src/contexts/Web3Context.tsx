import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Web3 from 'web3';
import { useMetamask } from '../hooks/useMetamask';

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (window.ethereum) setWeb3(new Web3(window.ethereum));
    else setError(new Error('There is no Web3 Provider!'));
  }, []);

  return { web3, error };
};

export interface IWeb3Context {
  account?: string;
  web3?: Web3;
  accountError?: Error;
  web3Error?: Error;
}

export const Web3Context = createContext<IWeb3Context>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  undefined!,
);

export const Web3Provider = ({ children }: PropsWithChildren) => {
  const { web3, error: web3Error } = useWeb3();
  const { account, error: accountError } = useMetamask();
  const value = { web3, account, web3Error, accountError };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  return context;
};
