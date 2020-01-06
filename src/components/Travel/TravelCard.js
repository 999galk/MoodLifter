import React from 'react';
import logoTravel from './logoTravel.png';
import './Card.css';


const TravelCard = ({onRouteChange}) => {
	return (
		<div className='tc grow card-bg br3 pa4 ma3 mb5 dib bw2 shadow-5'>
			<div>
		        <h2>Plan An Adventure</h2> 
	      	</div>
	      	<img className='grow pointer' alt='Travel' src={logoTravel} width='250px' height='250px' onClick={() => onRouteChange('/travel')}/>
	      	<div>
	      		<p>Ideas for a spontanious vacation</p>
	      	</div>
	    </div>
	);
}

export default TravelCard;