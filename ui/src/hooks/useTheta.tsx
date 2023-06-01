import Web3 from 'web3';
import { useWeb3Context } from '../contexts/Web3Context';
import { useMetamask } from './useMetamask';
import { THETA_UPLOAD_URL } from '../constants/config';

async function getAuthToken(account?: string, web3?: Web3) {
  if (!web3) throw new Error('No Web3 Provider!');
  if (!account) throw new Error('No Account Found!');
  const timestamp = Date.now().toString();
  const message = 'Theta EdgeStore Call ' + timestamp;
  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [message, account],
  });
  const auth_token = `${timestamp}.${account}.${signature}`;
  return auth_token;
}

export const useTheta = () => {
  const { account } = useMetamask();
  const { web3 } = useWeb3Context();

  const sendFilesToTheta = async (fileList: FileList) => {
    const authToken = await getAuthToken(account, web3);

    const headers = new Headers();
    headers.append('x-theta-edgestore-auth', authToken);

    const body = new FormData();
    for (const file of fileList) {
      body.append('directory', file, `${file.webkitRelativePath}`);
    }

    try {
      const res = await fetch(THETA_UPLOAD_URL, {
        method: 'POST',
        body,
        headers,
      });
      return (await res.json())?.key;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to upload to Theta');
    }
  };

  return { sendFilesToTheta };
};
