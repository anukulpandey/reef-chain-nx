// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {hooks} from '@reef-chain/react-lib';
import {network as nw} from "@reef-chain/util-lib";
// import * as x from "@reef-chain/evm-provider";

export function App() {

  const {loading,signers,reefState,error,selectedReefSigner} = hooks.useInitReefState("new-reef-app",{
    network: nw.AVAILABLE_NETWORKS.testnet
  })
  
  return (
    <div>
      {/* <button onClick={()=>console.log(x)}>sdf</button> */}
       <button onClick={()=>console.log("anuna",loading,signers,reefState,error,selectedReefSigner)}>hello anuna</button>
    </div>
  );
}

export default App;
