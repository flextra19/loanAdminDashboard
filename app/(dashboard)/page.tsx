'use client';

import React, { useState, useEffect } from 'react';
import { getPools, getPoolInfo, getPoolLoans } from '@/lib/db';
import { PoolsPage } from './pools-page';
import { PoolInfo } from './pool-info';
import '../toggle.css';
import { numberToHex } from 'viem';

export default function PoolsPageServer(props: {
  searchParams: Promise<{ q: string; page: string; address: string; chainId: string }>;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pools, setPools] = useState<any>([]);
  const [totalPools, setTotalPools] = useState<number>(0);
  const [page, setPage] = useState<string>();
  const [q, setQ] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');

  const [poolInfo, setPoolInfo] = useState<any>();
  const [poolLoans, setPoolLoans] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchParams = await props.searchParams;
        const val = searchParams.address ?? '';
        if (val != '') {
          const { res } = await getPoolInfo(searchParams.address,searchParams.chainId);
          const { loans } = await getPoolLoans(searchParams.address,searchParams.chainId)
          setPoolInfo(res);
          setPoolLoans(loans);
          setAddress(searchParams.address);
          setChainId(searchParams.chainId);
        }
        else {
          const q = searchParams.q ?? 'true';
          const page = searchParams.page ?? '1';
          const { pools, totalPools } = await getPools(q, Number(page));
          setPage(page);
          setPools(pools);
          setTotalPools(totalPools);
          setQ(q);
          setAddress('');
          setChainId('');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.searchParams]);

  return (
    <div className='w-full overflow-x-auto border-collapse'>
      {loading ? (
        <div>Loading...</div> // Replace with a loading spinner if needed
      ) : 
      ( address != '' ? 
        <PoolInfo
          pool={poolInfo}
          loans={poolLoans}
        /> :
        <PoolsPage
          pools={pools}
          totalPools={totalPools}
          page={Number(page)}
          q={q}
        />
      )}
    </div>
  );
}
