'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Modal from '@/components/ui/modal';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PoolsTable } from './pools-table';
import { useAccount } from 'wagmi'

export function PoolsPage({
  pools,
  totalPools,
  page,
  q
}: {
  pools: any[];
  totalPools: number;
  page: number;
  q: String;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure the component is rendering only on the client to prevent SSR mismatches
    setIsClient(true);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { address } = useAccount();

  if (!isClient) return null; // Avoid rendering until client-sid

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="flex items-center gap-2 ml-auto">
          <Button size="sm" className="h-8 gap-1" onClick={openModal} disabled={address===undefined}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Create Pool
            </span>
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      {/* } */}
      </div>
      <TabsContent value="all">
        <PoolsTable pools={pools} page={page} totalPools={totalPools} q={q}/>
      </TabsContent>
    </Tabs>
  );
}