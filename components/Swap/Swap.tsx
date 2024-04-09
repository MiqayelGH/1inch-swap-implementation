'use client';
import React, { useEffect, useState } from 'react';
import classes from './swap.module.css';
import { networkOptions, NetworkOption } from '@/utils/constants';

const Swap = ({ connected }: { connected: boolean }) => {
  const [payAmount, setPayAmount] = useState('0');
  const [receiveAmount, setReceiveAmount] = useState('0');
  const [error, setError] = useState('');
  const [selectedNetwork1, setSelectedNetwork1] = useState<string>('Ethereum');
  const [selectedNetwork2, setSelectedNetwork2] = useState<string>('Gnosis');

  const handleAmountChange = (e: { target: { value: any } }, setAmount: any) => {
    const inputAmount = e.target.value;

    if (inputAmount === '' || (!isNaN(inputAmount) && parseFloat(inputAmount) >= 0)) {
      setAmount(inputAmount === '' ? '0' : inputAmount);
      setError('');
    } else {
      setError('Please enter a valid non-negative number');
    }
  };

  useEffect(() => {
    setSelectedNetwork2('');
  }, []);

  const handleNetworkChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork1(event.target.value);
    setSelectedNetwork2('');
  };

  const handleNetworkChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork2(event.target.value);
  };

  const isOptionDisabled2 = (option: NetworkOption) => {
    return option.value === selectedNetwork1;
  };

  return (
    <div className={classes['swap-container']}>
      <div className={classes['container-header']}></div>
      <div className={classes['swap-input-container']}>
        <select
          value={selectedNetwork1}
          onChange={handleNetworkChange1}
          className={classes['swap-select']}
        >
          {networkOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={classes['swap-input']}
          value={payAmount}
          min={0}
          step={1}
          onChange={e => handleAmountChange(e, setPayAmount)}
        />
      </div>
      <div className={classes['swap-input-container']}>
        <select
          value={selectedNetwork2}
          onChange={handleNetworkChange2}
          className={classes['swap-select']}
        >
          <option value="">Select network</option>
          {networkOptions.map(option => (
            <option key={option.value} value={option.value} disabled={isOptionDisabled2(option)}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={classes['swap-input']}
          value={receiveAmount}
          min={0}
          step={1}
          onChange={e => handleAmountChange(e, setReceiveAmount)}
        />
        <div className={classes['msg-place']}></div>
        <button disabled={!connected} className={classes['btn-swap']}>
          Swap
        </button>
      </div>
    </div>
  );
};

export default Swap;
