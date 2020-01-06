import React from 'react';
import logoMeme from './logoMeme.png';

const MemeCard = ({ onRouteChange }) => {
	return (
		<div className='tc grow card-bg br3 br3 pa4 ma3 mb5 dib bw2 shadow-5'>
			<div>
		        <h2 style={{width:300}}>Funny memes to lift up your mood</h2> 
	      	</div>
	      	<img className='grow pointer' alt='Joke' src={logoMeme} width='250px' height='250px' onClick={() => onRouteChange('/meme')}/>
	      	<div>
	      		<p style={{width:300}}>Laughing is and will always be the best form of therapy</p>
	      	</div>
	    </div>
	);
}

export default MemeCard;