'use client';

import { useState, useEffect } from 'react';
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
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Pool } from './pool';
import { Loan } from './loan';

export function PoolInfo({ pool, loans }: { pool: any; loans: any[] }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pool Information</CardTitle>
          {/* <CardDescription>Manage your pools.</CardDescription> */}
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
              <Pool pool={pool} onClick={() => {}} />
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        <br />
      <Card>
        <CardHeader>
          <CardTitle>Loans Information</CardTitle>
          {/* <CardDescription>Manage your pools.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>ChainId</TableHead>
                <TableHead>LoanType</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Apr</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>PaymentPeriod</TableHead>
                <TableHead>DropDeadTimestamp</TableHead>
                <TableHead>LatePayment</TableHead>
                <TableHead>OriginationBps</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>LiquidityAsset</TableHead>
                <TableHead>OutstandingPrincipal</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>PaymentDueDate</TableHead>
                <TableHead>PaymentsRemaining</TableHead>
                <TableHead>State</TableHead>
                <TableHead>CollateralVault</TableHead>
                <TableHead>FundingVault</TableHead>
                <TableHead>Pool</TableHead>
                <TableHead>FungibleCollateral</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {loans.map((loan, index) => (
                <Loan key={index} loan={loan}/>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
