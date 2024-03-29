import { createContext } from 'react';
import { NFT } from '@reef-chain/react-lib';

interface NFTContext {
  nfts: NFT[];
  loading: boolean;
}
export default createContext<NFTContext>({
  loading: false,
  nfts: [],
});
