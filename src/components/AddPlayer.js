import React, { useContext, useState } from 'react';
import { PlayerContext } from './PlayerContext.js';

const AddPlayer = () => {
	const { dispatchPlayerProfile } = useContext(PlayerContext);
	const [ name, setName ] = useState('');
	const [ age, setAge ] = useState('');
	const [ bio, setBio ] = useState('');

	const handleAddPlayer = () => {
		const player = { id: Math.random(), name: name, age: age, bio: bio };
		dispatchPlayerProfile('UPDATE_PLAYER', { newPlayer: player });
	};

	return (
		<div>
			<h3>Add New Player</h3>
			<input type="text" value={name} onChange={e => {setName(e.target.value)}} placeholder="name"/>
			<br />
			<input type="text" value={age} onChange={e => {setAge(e.target.value)}} placeholder="age"/>
			<br />
			<textarea type="text" value={bio} onChange={e => {setBio(e.target.value)}} placeholder="bio"/>
			<br />
			<button onClick={handleAddPlayer}>Add Player</button>
		</div>
	);
};

export default AddPlayer;