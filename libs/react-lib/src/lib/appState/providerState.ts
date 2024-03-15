//@ts-nocheck
import { Provider } from '@reef-chain/evm-provider';
import { reefState } from '@reef-chain/util-lib';
import {Observable} from "rxjs"
import { Network } from '../components';

export const ACTIVE_NETWORK_LS_KEY = 'reef-app-active-network';
export const currentProvider$:Observable<Provider> = reefState.selectedProvider$;

export const currentNetwork$:Observable<Network> = reefState.selectedNetwork$;
export const setCurrentNetwork = reefState.setSelectedNetwork;
