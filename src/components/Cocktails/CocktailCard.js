import React from 'react';
import logoDrink from './logoDrink.png';


const CocktailCard = ({onRouteChange}) => {
	return (
		<div className='tc grow card-bg br3 pa4 ma3 mb5 dib bw2 shadow-5'>
			<div>
				<h1> Local Adventure</h1>
				<h2 className='center' style={{maxWidth: '30rem'}}>We'll pick your drink for tonight and you must go get it in the closest bar!</h2>
			</div>
	      <img className='grow pointer' alt='cocktail' src={logoDrink} width='250px' height='250px' onClick={() => onRouteChange('/cocktail')}/>
	      <div>
	        <p>No good story ever started with someone eating a salad</p>
	      </div>
		</div>
	);
}

export default CocktailCard;