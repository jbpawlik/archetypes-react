import React, { useContext } from 'react';
import { PlayerContext } from '../components/PlayerContext.js';
import { PlayerProfile } from '../components/PlayerProfile.js';


const PlayerList = () => {
	const { playerProfile } = useContext(PlayerContext);

return (
    <div>
      <h1>Players</h1>
        {playerProfile.map(player => <PlayerProfile key={player.id} player={player}/> )}
    </div>
  )
}
  export default PlayerList;
