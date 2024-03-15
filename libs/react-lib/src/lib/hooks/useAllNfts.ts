import { reefState } from '@reef-chain/util-lib';
import { NFT } from '../state';
import { useObservableState } from './useObservableState';

type UseAllNfts = [NFT[], boolean];
export const useAllNfts = (): UseAllNfts => {
  //@ts-ignore
  const nfts = useObservableState<NFT[]|null|undefined>(reefState.selectedNFTs$);
  const loading = nfts === undefined;

  return [nfts || [], loading];
};
