import { useContext } from 'react';
import { PlayerContext } from './PlayerContext.js';

export const PlayerProfile = ({ player }) => {
  const { playerProfile, dispatchPlayerProfile } = useContext(PlayerContext)

  const handleResetProfile = () => {
    dispatchPlayerProfile('RESET_PROFILE', { id: playerProfile.id })
  }

  const handleUpdateProfile = () => {
    dispatchPlayerProfile('UPDATE_PROFILE', {player})
  }

  // const newProfile = {
  //   id: '',
  //   name: '',
  //   bio: '',
  //   age: '',
  //   // playerAttributes: [],
  //   // occurrences: [],
  //   // playerArchetype: [],
  //   // playerOpposite: [],
  //   // friendArchetypes: [],
  // }

  return (
      <div className="PlayerProfile">
        <button onClick={handleUpdateProfile()}>Update</button>
        { player ?
        <>
        <p>{player.id}</p>
        <p>{player.name}</p>
        <p>{player.age}</p>
        <p>{player.bio}</p>
        </>
        :
        <>
        <p>No Players</p></>
        }
        <button onClick={handleResetProfile()}>Reset</button>
      </div>
  )

}