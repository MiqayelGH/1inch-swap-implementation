'use client';
import classes from './page.module.css';
import Swap from '@/components/Swap';
import useConnectWallet from '@/hooks/useConnect';
import { useDispatch, useSelector } from 'react-redux';
import { clearWalletData } from '@/lib/features/walletSlice';

export default function Home() {
  const { address, isConnected } = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const connectToWallet = useConnectWallet('metamask');

  const handleDisconnect = () => {
    dispatch(clearWalletData());
  };

  const handleConnect = async () => {
    try {
      const connectedAddress = await connectToWallet();
      if (connectedAddress) {
        console.log('Connected wallet address:', connectedAddress);
      } else {
        console.log('Connection failed or wallet not supported');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <main className={classes['root']}>
      <header className={classes['header']}>
        <div className={classes['header-wrapper']}>
          {isConnected ? (
            <>
              <button onClick={handleDisconnect} className={classes['connect-btn']}>
                Disconnect
              </button>
              {address}
            </>
          ) : (
            <button onClick={handleConnect} className={classes['connect-btn']}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <div className={classes['page-content']}>
        <Swap connected={isConnected} />
      </div>

      <div></div>
      <footer></footer>
    </main>
  );
}
