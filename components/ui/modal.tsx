import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PoolFactoryAbi } from '@/components/abi/PoolFactory';
import { writeContract, waitForTransaction, getPublicClient } from '@wagmi/core';
import { config } from './config';
import toast from 'react-hot-toast';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [liquidityAsset, setLiquidityAsset] = useState<string>('');
  const [maxCapacity, setMaxCapacity] = useState<string>('');
  const [endDate, setEndDate] = useState<Date | null>(null); // Use a Date object
  const [requestFeeBps, setRequestFeeBps] = useState<string>('');
  const [requestCancellationFeeBps, setRequestCancellationFeeBps] = useState<string>('');
  const [withdrawGateBps, setWithdrawGateBps] = useState<string>('');
  const [serviceFeeBps, setServiceFeeBps] = useState<string>('');
  const [firstLossInitialMinimum, setFirstLossInitialMinimum] = useState<string>('');
  const [withdrawRequestPeriodDuration, setWithdrawRequestPeriodDuration] = useState<string>('');
  const [fixedFee, setFixedFee] = useState<string>('');
  const [fixedFeeInterval, setFixedFeeInterval] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [poolFactoryAddress, setPoolFactoryAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');

  const { address, chainId } = useAccount();

  useEffect(() => {
    if (isOpen) {
      fetchFactoryAddress();
    }
  }, [isOpen, chainId]);

  const fetchFactoryAddress = async () => {
    try {
      const response = await fetch(`https://api.svim.io/deployments/${chainId}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'OHI6RZjsgJa9x0E10wPk', // Replace 'asdf' with your actual API key
        },
      });

      if (response.ok) {
        const data = await response.json();
        const poolFactory = data[data.length - 1].PoolFactory;
        setPoolFactoryAddress(poolFactory);
      } else {
        console.error('Failed to get factory address');
      }
    } catch (error) {
      console.error('Error getting factory address:', error);
    }
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!liquidityAsset) newErrors.liquidityAsset = 'Liquidity asset is required';
    if (!maxCapacity || isNaN(Number(maxCapacity))) newErrors.maxCapacity = 'Max capacity must be a number';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (!requestFeeBps || isNaN(Number(requestFeeBps))) newErrors.requestFeeBps = 'Request fee must be a number';
    if (!requestCancellationFeeBps || isNaN(Number(requestCancellationFeeBps)))
      newErrors.requestCancellationFeeBps = 'Request cancellation fee must be a number';
    if (!withdrawGateBps || isNaN(Number(withdrawGateBps))) newErrors.withdrawGateBps = 'Withdraw gate fee must be a number';
    if (!serviceFeeBps || isNaN(Number(serviceFeeBps))) newErrors.serviceFeeBps = 'Service fee must be a number';
    if (!firstLossInitialMinimum || isNaN(Number(firstLossInitialMinimum)))
      newErrors.firstLossInitialMinimum = 'First loss minimum must be a valid number';
    if (!withdrawRequestPeriodDuration || isNaN(Number(withdrawRequestPeriodDuration)))
      newErrors.withdrawRequestPeriodDuration = 'Withdraw period must be a number';
    if (!fixedFee || isNaN(Number(fixedFee))) newErrors.fixedFee = 'Fixed fee must be a valid amount';
    if (!fixedFeeInterval || isNaN(Number(fixedFeeInterval)))
      newErrors.fixedFeeInterval = 'Fixed fee interval must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreatePool = async () => {
    if (!validateInputs()) {
      toast.error('Please input the correct values before submitting');
      return;
    }

    try {
      if (address && poolFactoryAddress) {
        toast.success('Confirming transaction!');
        const publicClient = getPublicClient(config);
        const tx = await writeContract(config, {
          abi: PoolFactoryAbi,
          address: poolFactoryAddress as `0x${string}`,
          functionName: 'createPool',
          args: [
            liquidityAsset as `0x${string}`,
            {
              maxCapacity: BigInt(maxCapacity),
              endDate: BigInt(Math.floor(endDate!.getTime() / 1000)), // Convert Date to UNIX timestamp
              requestFeeBps: BigInt(requestFeeBps),
              requestCancellationFeeBps: BigInt(requestCancellationFeeBps),
              withdrawGateBps: BigInt(withdrawGateBps),
              serviceFeeBps: BigInt(serviceFeeBps),
              firstLossInitialMinimum: parseEther(firstLossInitialMinimum),
              withdrawRequestPeriodDuration: BigInt(withdrawRequestPeriodDuration),
              fixedFee: parseEther(fixedFee),
              fixedFeeInterval: BigInt(fixedFeeInterval),
            },
            name,
            symbol,
          ],
        });

        const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
        if (receipt.status === 'success') {
          toast.success('Pool created successfully!');
          console.log('Transaction confirmed:', receipt);
          window.location.reload();
        } else {
          toast.error('Transaction failed!');
          console.error('Transaction receipt:', receipt);
        }
      }
      onClose();
    } catch (error) {
      console.error('Error creating pool:', error);
      toast.error('Failed!');
    }
  };

  if (!isOpen) return null;

  const leftInputs = [
    { label: 'liquidityAsset', value: liquidityAsset, onChange: setLiquidityAsset },
    { label: 'maxCapacity', value: maxCapacity, onChange: setMaxCapacity },
    { label: 'endDate', value: '', onChange: () => {} }, // Placeholder for the date picker
    { label: 'requestFeeBps', value: requestFeeBps, onChange: setRequestFeeBps },
    { label: 'requestCancellationFeeBps', value: requestCancellationFeeBps, onChange: setRequestCancellationFeeBps },
    { label: 'withdrawGateBps', value: withdrawGateBps, onChange: setWithdrawGateBps },
    { label: 'serviceFeeBps', value: serviceFeeBps, onChange: setServiceFeeBps },
    { label: 'firstLossInitialMinimum', value: firstLossInitialMinimum, onChange: setFirstLossInitialMinimum },
    { label: 'withdrawRequestPeriodDuration', value: withdrawRequestPeriodDuration, onChange: setWithdrawRequestPeriodDuration },
    { label: 'fixedFee', value: fixedFee, onChange: setFixedFee },
    { label: 'fixedFeeInterval', value: fixedFeeInterval, onChange: setFixedFeeInterval },
    { label: 'name', value: name, onChange: setName },
    { label: 'symbol', value: symbol, onChange: setSymbol },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 overflow-y-auto border-collapse"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-md shadow-lg w-1/4 h-4/5 overflow-y-auto border-collapse"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Create Pool</h2>
          <label className="block mb-2">
            Chain ID: {chainId} <br />
            PoolFactory: {poolFactoryAddress}
          </label>
          <div className="grid grid-cols-1 gap-4">
            <div>
              {leftInputs.map((input, index) => {
                if (input.label === 'endDate') {
                  return (
                    <label key={index} className="block mb-2">
                      {input.label}:
                      <DatePicker
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                      />
                    </label>
                  );
                }
                return (
                  <label key={index} className="block mb-2">
                    {input.label}:
                    <input
                      type="text"
                      className="block w-full p-2 border rounded mt-1"
                      value={input.value}
                      onChange={(e) => input.onChange(e.target.value)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <button onClick={handleCreatePool} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Create Pool
          </button>
          <button onClick={onClose} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Modal;

