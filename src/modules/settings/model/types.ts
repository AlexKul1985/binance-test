import { CurrencyVariants } from './types';

export type CurrencyTuple = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
export type CurrencyVariants = TupleToUnion<CurrencyTuple>

