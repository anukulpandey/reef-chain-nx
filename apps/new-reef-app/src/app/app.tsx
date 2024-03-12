// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {hooks} from '@reef-chain/react-lib';
import {network as nw} from "@reef-chain/util-lib";
import Uik from '@reef-chain/ui-kit';
import { useState } from 'react';

export function App() {
  const [isAccountSelectorOpen,setIsAccountSelectorOpen] = useState(false);

  const {loading,signers,reefState,error,selectedReefSigner} = hooks.useInitReefState("new-reef-app",{
    network: nw.AVAILABLE_NETWORKS.testnet
  })
  
  return (
    <div className='app'>
      {loading?
    <Uik.Loading/>  : <>
    <div className='navbar'>
    <Uik.Button className='account-selector' text={selectedReefSigner?.name} onClick={()=>setIsAccountSelectorOpen(!isAccountSelectorOpen)} rounded fill/>
    </div>

    <Uik.AccountSelector isOpen={isAccountSelectorOpen} accounts={signers} selectedAccount={selectedReefSigner} onClose={()=>setIsAccountSelectorOpen(false)}/>
    </> 
    }
    </div>
  );
}

export default App;
