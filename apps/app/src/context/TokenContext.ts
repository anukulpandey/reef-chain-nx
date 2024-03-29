import { Token } from '@reef-chain/react-lib';
import { createContext } from 'react';

interface TokenContext {
  tokens: Token[];
  loading: boolean;
}
export default createContext<TokenContext>({
  loading: false,
  tokens: [],
});
