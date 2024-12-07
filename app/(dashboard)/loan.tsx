import { TableCell, TableRow } from '@/components/ui/table';
import { LoanInfo } from '@/lib/db';

export function Loan({ loan }: { loan: LoanInfo }) {
  return (
    <TableRow className="cursor-pointer hover:bg-gray-100">
      <TableCell className="font-medium">{loan.address}</TableCell>
      <TableCell className="font-medium">{loan.chain_id}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.loan_type}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.principal}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.apr}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.duration}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.payment_period}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.drop_dead_timestamp}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.late_payment}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.origination_bps}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.borrower}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.created_at}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.liquidity_asset}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.outstanding_principal}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.payment}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.payment_due_date}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.payments_remaining}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.state}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.collateral_vault}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.funding_vault}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.pool}</TableCell>
      <TableCell className="hidden md:table-cell">{loan.fungible_collateral}</TableCell>
    </TableRow>
  );
}
