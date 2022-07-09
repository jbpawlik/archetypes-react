import './App.css';
import React, {} from 'react'
import SelfSimulator from './components/SelfSimulator.js'
import {useWindowDimensions} from './functions/getWindowDimensions.js';

function App() {
  const { height, width } = useWindowDimensions();

  return (<>
    <div className="App-background" >
      <div className="App-container" >>
        <div className='woodenBox' style={{height: height/2, width: width/2}}>
          <SelfSimulator/>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
