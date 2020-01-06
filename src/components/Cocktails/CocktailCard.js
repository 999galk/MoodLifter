import React from 'react';
import logoDrink from './logoDrink.png';
import styles from './Card.css';


const CocktailCard = ({onRouteChange}) => {
	return (
		<div className='tc grow card-bg br3 pa4 ma3 mb5 dib bw2 shadow-5'>
			<div>
				<h2>Take A Drink</h2>
			</div>
	      <img className='grow pointer' alt='cocktail' src={logoDrink} width='250px' height='250px' onClick={() => onRouteChange('/cocktail')}/>
	      <div>
	        <p>Drinks ideas for tonight</p>
	      </div>
	    </div>
	);
}

export default CocktailCard;