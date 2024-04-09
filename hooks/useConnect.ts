import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletAddress, clearWalletData } from '../lib/features/walletSlice';

type WalletType = 'metamask' | 'walletconnect' | 'otherWallet';

const useConnectWallet = (walletType: WalletType): () => Promise<string | null> => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.wallet); 

  const connect = async () => {
    if (walletType === 'metamask') {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            dispatch(setWalletAddress(accounts[0])); 
            return accounts[0]; 
          }
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not detected');
      }
    } else {
      console.error('Unsupported wallet type:', walletType);
    }
    return null; 
  };


  useEffect(() => {
    window.ethereum?.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        dispatch(setWalletAddress(accounts[0]));
      } else {
        dispatch(clearWalletData());
      }
    });

    return () => {
      window.ethereum?.removeListener('accountsChanged', () => {});
    };
  }, [dispatch]);

  return connect;
};

export default useConnectWallet;
