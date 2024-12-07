'use client';

import {useState} from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Pool } from './pool';
import { SelectPool } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '80%',
  overflowY: 'auto'
};

export function PoolsTable({
  pools,
  page = 1,
  totalPools,
  q
}: {
  pools: SelectPool[];
  page: number;
  totalPools: number;
  q: String;
}) {
  let router = useRouter();
  let poolsPerPage = 10;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<SelectPool | null>(null);

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?page=${Number(page) + 1}&q=${q}`, { scroll: false });
  }

  function handlePoolClicked(pool: SelectPool) {
    let params = new URLSearchParams({ address: pool.address, chainId: pool.chainId});
    router.push(`/?${params.toString()}`);
    // setSelectedPool(pool);
    // setModalOpen(true);
  }

  // function closeModal() {
    // setSelectedPool(null);
    // setModalOpen(false);
  // }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Pools</CardTitle>
        <CardDescription>
          Manage your pools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Name</TableHead>
              {/* <TableHead>Status</TableHead> */}
              {/* <TableHead className="hidden md:table-cell">Price</TableHead> */}
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead>ChainId</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>fixedFeeDueDate</TableHead>
              <TableHead>totalAssestsDeposited</TableHead>
              <TableHead>totalAssetsWithdrawn</TableHead>
              <TableHead>totalDefaults</TableHead>
              <TableHead>totalFirstLossApplied</TableHead>
              <TableHead>activatedAt</TableHead>
              <TableHead>activeLoans</TableHead>
              <TableHead>admin</TableHead>
              <TableHead>assetAddress</TableHead>
              <TableHead>currentExpectedInterest</TableHead>
              <TableHead>decimals</TableHead>
              <TableHead>liquidityPoolAssets</TableHead>
              <TableHead>feeVault</TableHead>
              <TableHead>firstLossVault</TableHead>
              <TableHead>numActiveLoans</TableHead>
              <TableHead>poolController</TableHead>
              <TableHead>serviceConfiguration</TableHead>
              <TableHead>maxCapacity</TableHead>
              <TableHead>endDate</TableHead>
              <TableHead>requestFeeBps</TableHead>
              <TableHead>requestCancellationFeeBps</TableHead>
              <TableHead>withdrawGateBps</TableHead>
              <TableHead>serviceFeeBps</TableHead>
              <TableHead>firstLossInitialMinimum</TableHead>
              <TableHead>withdrawRequestPeriodDuration</TableHead>
              <TableHead>fixedFee</TableHead>
              <TableHead>fixedFeeInterval</TableHead>
              <TableHead>state</TableHead>
              <TableHead>symbol</TableHead>
              <TableHead>totalAssets</TableHead>
              <TableHead>totalAvailableAssets</TableHead>
              <TableHead>totalAvailableSupply</TableHead>
              <TableHead>totalSupply</TableHead>
              <TableHead>withdrawController</TableHead>
              <TableHead>asset</TableHead>
              <TableHead>hasFunded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.map((pool, index) => (
              <Pool key={index} pool={pool} onClick={() => handlePoolClicked(pool)}/>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {(page - 1) * poolsPerPage + 1} - {Math.min(page * poolsPerPage, totalPools)}
            </strong>{' '}
            of <strong>{totalPools}</strong> pools
          </div>
          <div className="flex absolute right-[30px]">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={page === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={totalPools <= page * poolsPerPage}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
    {/* {isModalOpen && selectedPool && (
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={style}>
        <h2 className="text-lg font-bold">Pool Details</h2>
        <p><strong>Address:</strong><br /> {selectedPool.address}</p>
        <p><strong>Name:</strong><br /> {selectedPool.name}</p>
        <p><strong>Description:</strong><br /> {selectedPool.description}</p>
        <p><strong>Type:</strong><br /> {selectedPool.type}</p>
        <p><strong>Chain:</strong><br /> {selectedPool.chain}</p>
        <p><strong>ChainId:</strong><br /> {selectedPool.chainId}</p>
        <p><strong>OutstandingLoanPrincipals:</strong><br /> {selectedPool.outstandingLoanPrincipals}</p>
        <p><strong>fixedFeeDueDate:</strong><br /> {selectedPool.fixedFeeDueDate}</p>
        <p><strong>totalAssestsDeposited:</strong><br /> {selectedPool.totalAssestsDeposited}</p>
        <p><strong>totalAssetsWithdrawn:</strong><br /> {selectedPool.totalAssetsWithdrawn}</p>
        <p><strong>totalDefaults:</strong><br /> {selectedPool.totalDefaults}</p>
        <p><strong>totalFirstLossApplied:</strong><br /> {selectedPool.totalFirstLossApplied}</p>
        <p><strong>activatedAt:</strong><br /> {(new Date(Number(selectedPool.activatedAt) * 1000)).toLocaleString()}</p>
        <p><strong>activeLoans:</strong><br /> {selectedPool.activeLoans}</p>
        <p><strong>admin:</strong><br /> {selectedPool.admin}</p>
        <p><strong>assetAddress:</strong><br /> {selectedPool.assetAddress}</p>
        <p><strong>currentExpectedInterest:</strong><br /> {selectedPool.currentExpectedInterest}</p>
        <p><strong>decimals:</strong><br /> {selectedPool.decimals}</p>
        <p><strong>liquidityPoolAssets:</strong><br /> {selectedPool.liquidityPoolAssets}</p>
        <p><strong>feeVault:</strong><br /> {selectedPool.feeVault}</p>
        <p><strong>firstLossVault:</strong><br /> {selectedPool.firstLossVault}</p>
        <p><strong>numActiveLoans:</strong><br /> {selectedPool.numActiveLoans}</p>
        <p><strong>poolController:</strong><br /> {selectedPool.poolController}</p>
        <p><strong>serviceConfiguration:</strong><br /> {selectedPool.serviceConfiguration}</p>
        <p><strong>maxCapacity:</strong><br /> {selectedPool.maxCapacity}</p>
        <p><strong>endDate:</strong><br /> {(new Date(Number(selectedPool.endDate) * 1000)).toLocaleString()}</p>
        <p><strong>requestFeeBps:</strong><br /> {selectedPool.requestFeeBps}</p>
        <p><strong>requestCancellationFeeBps:</strong><br /> {selectedPool.requestCancellationFeeBps}</p>
        <p><strong>withdrawGateBps:</strong><br /> {selectedPool.withdrawGateBps}</p>
        <p><strong>serviceFeeBps:</strong><br /> {selectedPool.serviceFeeBps}</p>
        <p><strong>firstLossInitialMinimum:</strong><br /> {selectedPool.firstLossInitialMinimum}</p>
        <p><strong>withdrawRequestPeriodDuration:</strong><br /> {selectedPool.withdrawRequestPeriodDuration}</p>
        <p><strong>fixedFee:</strong><br /> {selectedPool.fixedFee}</p>
        <p><strong>fixedFeeInterval:</strong><br /> {selectedPool.fixedFeeInterval}</p>
        <p><strong>state:</strong><br /> {selectedPool.state}</p>
        <p><strong>symbol:</strong><br /> {selectedPool.symbol}</p>
        <p><strong>totalAssets:</strong><br /> {selectedPool.totalAssets}</p>
        <p><strong>totalAvailableAssets:</strong><br /> {selectedPool.totalAvailableAssets}</p>
        <p><strong>totalAvailableSupply:</strong><br /> {selectedPool.totalAvailableSupply}</p>
        <p><strong>totalSupply:</strong><br /> {selectedPool.totalSupply}</p>
        <p><strong>withdrawController:</strong><br /> {selectedPool.withdrawController}</p>
        <p><strong>asset:</strong><br /> {selectedPool.asset}</p>
        <p><strong>hasFunded:</strong><br /> {selectedPool.hasFunded}</p>
        </Box>
      </Modal>
    )} */}
    </>
  );
}
