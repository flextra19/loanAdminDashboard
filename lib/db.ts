// import { neon } from '@neondatabase/serverless';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';

// export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive']);

export const pools = pgTable('pools', {
  address: text('address').notNull(),
  name: text('name').notNull(),
  // status: statusEnum('status').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  chain: text('chain').notNull(),
  chainId: text('chainId').notNull(),
  outstandingLoanPrincipals: text('outstandingLoanPrincipals').notNull(),
  fixedFeeDueDate: text('fixedFeeDueDate').notNull(),
  totalAssestsDeposited: text('totalAssestsDeposited').notNull(),
  totalAssetsWithdrawn: text('totalAssetsWithdrawn').notNull(),
  totalDefaults: text('totalDefaults').notNull(),
  totalFirstLossApplied: text('totalFirstLossApplied').notNull(),
  activatedAt: text('activatedAt').notNull(),
  activeLoans: text('activeLoans').notNull(),
  admin: text('admin').notNull(),
  assetAddress: text('assetAddress').notNull(),
  currentExpectedInterest: text('currentExpectedInterest').notNull(),
  decimals: text('decimals').notNull(),
  liquidityPoolAssets: text('liquidityPoolAssets').notNull(),
  feeVault: text('feeVault').notNull(),
  firstLossVault: text('firstLossVault').notNull(),
  numActiveLoans: text('numActiveLoans').notNull(),
  poolController: text('poolController').notNull(),
  serviceConfiguration: text('serviceConfiguration').notNull(),
  maxCapacity: text('maxCapacity').notNull(),
  endDate: text('endDate').notNull(),
  requestFeeBps: text('requestFeeBps').notNull(),
  requestCancellationFeeBps: text('requestCancellationFeeBps').notNull(),
  withdrawGateBps: text('withdrawGateBps').notNull(),
  serviceFeeBps: text('serviceFeeBps').notNull(),
  firstLossInitialMinimum: text('firstLossInitialMinimum').notNull(),
  withdrawRequestPeriodDuration: text('withdrawRequestPeriodDuration').notNull(),
  fixedFee: text('fixedFee').notNull(),
  fixedFeeInterval: text('fixedFeeInterval').notNull(),
  state: text('state').notNull(),
  symbol: text('symbol').notNull(),
  totalAssets: text('totalAssets').notNull(),
  totalAvailableAssets: text('totalAvailableAssets').notNull(),
  totalAvailableSupply: text('totalAvailableSupply').notNull(),
  totalSupply: text('totalSupply').notNull(),
  withdrawController: text('withdrawController').notNull(),
  asset: text('asset').notNull(),
  hasFunded: text('hasFunded').notNull(),
});

export type SelectPool = typeof pools.$inferSelect;

export async function getPools(
  q: string,
  page: number
): Promise<{
  pools: SelectPool[];
  totalPools: number;
}> {
  let pools:any[] = [];
  let totalPools = 0;

  const url = `https://api.svim.io/pools?mainnet=${q}&page=${page}`;

  await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'OHI6RZjsgJa9x0E10wPk' // Replace 'asdf' with your actual API key
    }
  })
    .then((response) => response.json())
    .then((data) => {
      pools = data.pools; // Process the returned data here
      totalPools = data.pagination.total_count;
    })
    .catch((error) => {
      console.error('Error:'); // Handle any error that occurs
    });

  // Always search the full table, not per page
  // if (search) {
  //   return {
  //     pools: await db
  //       .select()
  //       .from(pools)
  //       .where(ilike(pools.name, `%${search}%`))
  //       .limit(1000),
  //     newOffset: null,
  //     totalPools: 0
  //   };
  // }

    return { pools: pools, totalPools: totalPools };
}

export async function getPoolInfo(
  address: string,
  chainId: string
): Promise<{
  res: SelectPool
}> {
  let res : any;

  const url = `https://api.svim.io/pool/${chainId}/${address}`;

  await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'OHI6RZjsgJa9x0E10wPk' // Replace 'asdf' with your actual API key
    }
  })
    .then((response) => response.json())
    .then((data) => {
      res = data;
      console.log("res", res)
    })
    .catch((error) => {
      console.error('Error:'); // Handle any error that occurs
    });

  // Always search the full table, not per page
  // if (search) {
  //   return {
  //     pools: await db
  //       .select()
  //       .from(pools)
  //       .where(ilike(pools.name, `%${search}%`))
  //       .limit(1000),
  //     newOffset: null,
  //     totalPools: 0
  //   };
  // }

    return { res: res };
}

export type LoanInfo = {
  address: string;
  chain_id: string;
  loan_type: string;
  principal: string;
  apr: string;
  duration: string;
  payment_period: string;
  drop_dead_timestamp: string;
  late_payment: string;
  origination_bps: string;
  borrower: string;
  created_at: string;
  liquidity_asset: string;
  outstanding_principal: string;
  payment: string;
  payment_due_date: string;
  payments_remaining: string;
  state: string;
  collateral_vault: string;
  funding_vault: string;
  pool: string;
  fungible_collateral: string;
};

export async function getPoolLoans(
  address: string,
  chainId: string
): Promise<{
  loans: LoanInfo[];
}> {
  let loans:any[] = [];

  const url = `https://api.svim.io/pool/${chainId}/${address}/loans`;

  await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'OHI6RZjsgJa9x0E10wPk' // Replace 'asdf' with your actual API key
    }
  })
    .then((response) => response.json())
    .then((data) => {
      loans = data;
    })
    .catch((error) => {
      console.error('Error:'); // Handle any error that occurs
    });

  // Always search the full table, not per page
  // if (search) {
  //   return {
  //     pools: await db
  //       .select()
  //       .from(pools)
  //       .where(ilike(pools.name, `%${search}%`))
  //       .limit(1000),
  //     newOffset: null,
  //     totalPools: 0
  //   };
  // }

    return { loans: loans };
}

