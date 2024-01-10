// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Example from '.';
import styles from './app.module.css';
import Uik from '@reef-chain/ui-kit';

export function App() {
  return (
    <div>
      {/* <UiKit/> */}
      <Example/>
      <Uik.Button text='test btn' onClick={()=>console.log("anuna")}/>
    </div>
  );
}

export default App;
