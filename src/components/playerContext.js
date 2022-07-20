import { createContext } from "react";

export const playerContext = createContext();

// import React, { createContext, useState } from "react";
// import { playerProfile } from "./playerProfile.js";

// const PlayerContext = createContext(playerProfile);
// const PlayerDispatchContext = createContext(undefined);

// function PlayerProvider({ children }) {
//   const [playerDetails, setPlayerDetails] = useState({
//     playerAttributes: [],
//     playerArchetype: [],
//     playerOpposite: []
//   });

//   return (
//     <PlayerContext.Provider value={playerDetails}>
//       <PlayerDispatchContext.Provider value={setPlayerDetails}>
//         {children}
//       </PlayerDispatchContext.Provider>
//     </PlayerContext.Provider>
//   );
// }

// export { PlayerProvider, PlayerContext, PlayerDispatchContext };