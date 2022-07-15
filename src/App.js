import './css/App.css';
import React, {useState } from 'react'
import SelfSimulator from './components/SelfSimulator.js'
import $ from 'jquery'
import useSound from 'use-sound'
import rustle from './assets/sounds/rustle.wav';
import blanket from './assets/sounds/blanket.wav';
import sweatpants from './assets/sounds/sweatpants.wav';
import woodclack from './assets/sounds/woodclack.wav'
import woodtap from './assets/sounds/woodtap.wav';
import { playerContext } from './components/playerContext.js';
import CommandLineTerminal from './components/CommandLineTerminal.js';
// import {TextInterface} from './TextInterface/TextInterface.js';
// import {useWindowDimensions} from './functions/getWindowDimensions.js';

function App() {
  // const { height, width } = useWindowDimensions();
  const [intro] = useSound(woodclack)
  const [titleRemoved, removeTitle] = useState(false)
  const [playerProfile, setPlayerProfile] = useState({}) 

  const clickTitle = () => {
    if (!titleRemoved) {
    intro()
    $('.App-title').remove()
    removeTitle(true)
    $('.main-console').css('display', 'flex')
  } else if (titleRemoved) {
  }
}

const dispatchPlayerProfile = (actionType, payload) => {
  switch (actionType) {
    case 'SET_PROFILE':
      setPlayerProfile([ ...playerProfile, payload.newPlayer ]);
      return;
    case 'REMOVE_USER':
      setPlayerProfile(playerProfile.filter(player => player.id !== payload.playerId));
      return;
    default:
      return;
  }
};

  return (<>
    <playerContext.Provider value={{playerProfile, dispatchPlayerProfile}}>
      <div className="App-background">
      <CommandLineTerminal />

        {/* <div className="App-container" onClick={() => clickTitle()}>
        <h1 className="App-title">ARCHETYPES</h1>
          <SelfSimulator titleRemoved={titleRemoved}/>
        </div> */}
     </div>
    </playerContext.Provider>
  </>
  );
}

export default App;
