import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectPool } from '@/lib/db';

export function Pool({ pool, onClick }: { pool: SelectPool; onClick: () => void }) {
  return (
    <TableRow onClick={onClick} className="cursor-pointer hover:bg-gray-100">
      <TableCell className="font-medium">{pool.address}</TableCell>
      <TableCell className="font-medium">{pool.name}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.description}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.type}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.chain}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.chainId}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.outstandingLoanPrincipals}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.fixedFeeDueDate}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalAssestsDeposited}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalAssetsWithdrawn}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalDefaults}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalFirstLossApplied}</TableCell>
      <TableCell className="hidden md:table-cell">
        {(new Date(Number(pool.activatedAt) * 1000)).toLocaleString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">{pool.activeLoans}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.admin}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.assetAddress}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.currentExpectedInterest}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.decimals}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.liquidityPoolAssets}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.feeVault}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.firstLossVault}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.numActiveLoans}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.poolController}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.serviceConfiguration}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.maxCapacity}</TableCell>
      <TableCell className="hidden md:table-cell">
        {(new Date(Number(pool.endDate) * 1000)).toLocaleString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">{pool.requestFeeBps}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.requestCancellationFeeBps}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.withdrawGateBps}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.serviceFeeBps}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.firstLossInitialMinimum}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.withdrawRequestPeriodDuration}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.fixedFee}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.fixedFeeInterval}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.state}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.symbol}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalAssets}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalAvailableAssets}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalAvailableSupply}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.totalSupply}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.withdrawController}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.asset}</TableCell>
      <TableCell className="hidden md:table-cell">{pool.hasFunded}</TableCell>
    </TableRow>
  );
}
