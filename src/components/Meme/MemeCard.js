import React from 'react';
import logoMeme from './logoMeme.png';
import styles from './Card.css';

const MemeCard = ({ onRouteChange }) => {
	return (
		<div className='tc grow card-bg br3 br3 pa4 ma3 mb5 dib bw2 shadow-5'>
			<div>
		        <h2>Have A Laugh</h2> 
	      	</div>
	      	<img className='grow pointer' alt='Joke' src={logoMeme} width='250px' height='250px' onClick={() => onRouteChange('/meme')}/>
	      	<div>
	      		<p>Funny memes to lift up your mood</p>
	      	</div>
	    </div>
	);
}

export default MemeCard;