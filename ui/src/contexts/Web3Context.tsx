import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Web3 from 'web3';

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

export const Web3Context = createContext<ReturnType<typeof useWeb3>>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  undefined!,
);

export const Web3Provider = ({ children }: PropsWithChildren) => {
  const value = useWeb3();

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
