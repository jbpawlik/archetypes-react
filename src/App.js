import './css/App.css';
import React, {useState} from 'react'
import SelfSimulator from './components/SelfSimulator.js'
import $ from 'jquery'
import useSound from 'use-sound'
import rustle from './assets/sounds/rustle.wav';
import blanket from './assets/sounds/blanket.wav';
import sweatpants from './assets/sounds/sweatpants.wav';
import woodclack from './assets/sounds/woodclack.wav'
import woodtap from './assets/sounds/woodtap.wav';
import { PlayerContext } from './components/PlayerContext.js';
import CommandLineTerminal from './components/CommandLineTerminal.js';
import AddPlayer from './components/AddPlayer.js';
import PlayerList from './components/PlayerList.js';

// import {TextInterface} from './TextInterface/TextInterface.js';
// import {useWindowDimensions} from './functions/getWindowDimensions.js';

function App() {
  // const { height, width } = useWindowDimensions();
  const [intro] = useSound(woodclack)
  const [titleRemoved, removeTitle] = useState(false);
  const [playerProfile, setPlayerProfile] = useState([{id: 1, name: 'hi', age: 4, bio: 'hazard'}])

  const dispatchPlayerProfile = (actionType, payload) => {
    switch (actionType) {
      case 'UPDATE_PLAYER':
        setPlayerProfile([ ...playerProfile, payload.newPlayer ]);
        return;
      case 'RESET_PLAYER':
        setPlayerProfile(playerProfile.filter(player => player.id !== payload.id));
        return;
      default:
        return;
    }
  };


  const clickTitle = () => {
    if (!titleRemoved) {
    intro()
    $('.App-title').remove()
    removeTitle(true)
    $('.main-console').css('display', 'flex')
    } else if (titleRemoved) {
  }
  }


  return (<>
    <PlayerContext.Provider value={{ playerProfile, dispatchPlayerProfile }}>
      <AddPlayer></AddPlayer>
      <PlayerList></PlayerList>
      <div className="App-background">
      <CommandLineTerminal />


        {/* <div className="App-container" onClick={() => clickTitle()}>
        <h1 className="App-title">ARCHETYPES</h1>
          <SelfSimulator titleRemoved={titleRemoved}/>
        </div> */}
      </div>
    </PlayerContext.Provider>
  </>
  );
}

export default App;
