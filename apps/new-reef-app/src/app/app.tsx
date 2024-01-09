// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {network,reefState} from '@reef-chain/util-lib';

export function App() {
  const initNetwork = ()=>{
    reefState.setSelectedNetwork(network.AVAILABLE_NETWORKS.mainnet)
  }
  return (
    <div>
       <button onClick={initNetwork}>hello reef</button>
    </div>
  );
}

export default App;
