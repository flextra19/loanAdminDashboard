'use client';

import React, { useState, useEffect } from 'react';
import { getPools } from '@/lib/db';
import { PoolsPage } from './pools-page';
import '../toggle.css';
import { numberToHex } from 'viem';

export default function PoolsPageServer(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pools, setPools] = useState<any>([]);
  const [totalPools, setTotalPools] = useState<number>(0);
  const [page, setPage] = useState<string>();
  const [q, setQ] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchParams = await props.searchParams;
        const q = searchParams.q ?? 'true';
        const page = searchParams.page ?? '1';
        const { pools, totalPools } = await getPools(q, Number(page));
        setPage(page);
        setPools(pools);
        setTotalPools(totalPools);
        setQ(q);
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
      ) : (
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
