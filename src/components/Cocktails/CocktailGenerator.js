import React from 'react';
import Carousel from 'react-simply-carousel';
import './Card.css';


class CocktailGenerator extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      activeSlideIndex : 0,
	      cocktailImg : '',
	      cocktailName: '',
	      cocktailIngredients : '',
	      allCocktails : [],
	      cocktailNum : -1,
	      cocktailSuggestions : []
	    }
  	}

  	setActiveSlideIndex = (newActiveSlideIndex) => {
	    this.setState({
	      activeSlideIndex: newActiveSlideIndex
	    });
  	}

  	fetchCocktail = () => {
		fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
					.then(res => res.json())
					.then(data => {
						const ingr = (Object.entries(data.drinks[0])).filter(arr => arr[0].includes('Ingredient')).filter(arr => arr[1]!==undefined&&arr[1]!==null).map(arr => arr[1]);
						this.setState({cocktailImg : data.drinks[0].strDrinkThumb, cocktailName : data.drinks[0].strDrink, cocktailIngredients : ingr.join(', ')});
					} , this.keepInArray((this.state.cocktailNum)+1));
	}

	fetchSuggestions = () => {
		for (let i=0;i<10;i++){
			fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
					.then(res => res.json())
					.then(data => {
						const ingr = (Object.entries(data.drinks[0])).filter(arr => arr[0].includes('Ingredient')).filter(arr => arr[1]!==undefined&&arr[1]!==null).map(arr => arr[1]);
						const newSuggestion = {
							cocktailImg : data.drinks[0].strDrinkThumb,
							cocktailName : data.drinks[0].strDrink,
							cocktailIngredients : ingr.join(', ')
						}
						const joined = this.state.cocktailSuggestions.concat(newSuggestion);
						this.setState({cocktailSuggestions : joined});
					});
		}
		
	}

	keepInArray = (num) => {
		if(num > 0){
			const newCocktail = {
			cocktailImg : this.state.cocktailImg,
			cocktailName: this.state.cocktailName, 
			cocktailIngredients : this.state.cocktailIngredients
			};
			const joined = this.state.allCocktails.concat(newCocktail);
			this.setState({allCocktails : joined});
		}
		this.setState({cocktailNum : (this.state.cocktailNum)+1});
	}

  	unhideSuggestions = () => {
  		const div = document.getElementById('suggestions');
  		if(div && this.state.allCocktails.length >= 0){
  			if(div.className==='hide'){
  				div.className='unhide';
  			}
  		}
  	}

  	changeBack = (event) => {
  		const i = event.target.id;
  		const cocktails = this.state.cocktailSuggestions;
  		this.setState({
  			cocktailImg : cocktails[i].cocktailImg,
  			cocktailName : cocktails[i].cocktailName,
  			cocktailIngredients : cocktails[i].cocktailIngredients
  		})
  	}

  	handleOnClick = (event) => {
		const sugDiv = document.getElementById('suggestions');
		sugDiv.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}

  	componentDidMount(){
		this.fetchCocktail();
		this.fetchSuggestions();
		window.onpopstate = this.props.onBackButtonEvent;	
	}

	render(){
		const {cocktailImg, cocktailName, cocktailIngredients, cocktailSuggestions} = this.state;
		return (
			<div>
			<div className='card-bg fade-in br3 pa3 ma2 mb5 dib bw2 shadow-5'>
				<div>
					<h1>Your chosen drink for tonight is:</h1>
				</div>
				<div className='flex'>
			      	<img alt='cocktail' src={cocktailImg} width='400px' height='400px' className='ma3'/>
			      	<div className='pa4 mw5 mw7-ns center ph5-ns'>
				        <h2 className='pa2 mt0'>{cocktailName}</h2>
				        <p className='w5 lh-copy measure'>{cocktailIngredients}</p>
				        <div className='mt4'>
				        <a className='f3' href="https://www.google.co.il/maps/search/bar" target="_blank" rel="noopener noreferrer"> Go get It! </a>
				        </div>
				        <p className='mt5'>Not for you?</p>
				        <img alt='downAroow' className='pointer' src='https://cdn4.iconfinder.com/data/icons/colorful-basic-arrows/515/arrow_down_circle_darkblue-512.png' width='50px' height='50px' onClick={this.handleOnClick}/>
			        </div> 
		        </div>
		    </div>
		    <div id='suggestions'>
		    <hr/>
		    <h2 className='mt2'> More Suggestions:</h2>
		    <div className='br3 pa3 ma2 mb5 dib bw2 shadow-5'>
		    	<Carousel
		      	id='carousle'
		      	containerProps={{
		          style: {
		            justifyContent: "space-between",
		            marginBottom : '8px'
		          }
		        }}
		        activeSlideIndex={this.state.activeSlideIndex}
		        onRequestChange={this.setActiveSlideIndex}
		        forwardBtnProps={{
		          children: <img alt='rightArrow' className='grow' src="http://www.2do.rs/wp-content/uploads/2017/09/arrow-right-blue.svg"/>,
		          style: {
		            width: 70,
		            height: 70,
		            minWidth: 70,
		            alignSelf: "center",
		            backgroundColor: 'Transparent',
				    backgroundRepeat :'no-repeat',
				    border : 'none',
				    cursor : 'pointer',
				    overflow : 'hidden',
				    outline: 'none'
		          }
		        }}
		        backwardBtnProps={{
		          children: <img alt='leftArrow' className='grow' src="http://www.2do.rs/wp-content/uploads/2017/09/arrow-left-blue.svg"/>,
		          style: {
		            width: 70,
		            height: 70,
		            minWidth: 70,
		            alignSelf: "center",
		            backgroundColor: 'Transparent',
				    backgroundRepeat :'no-repeat',
				    border : 'none',
				    cursor : 'pointer',
				    overflow : 'hidden',
				    outline: 'none'
		          }
		        }}
		        itemsToShow={3}
		        speed={400}
		      >
			    {Array.from(cocktailSuggestions).map((item, index) => (
		    		<div key={index} id='activeItem' style={{width:350}} className='bw2 shadow-5'>
		    			<h3>{cocktailSuggestions[index].cocktailName}</h3>
		            	<img alt='cocktail' className='pointer' id={index} src={cocktailSuggestions[index].cocktailImg} style={{width:300, height:300}}
		            		onClick={this.changeBack}/>
		          	</div>  
			    ))}
		      </Carousel>
		      </div>
		    </div>
		    </div>
		);
	}
}

export default CocktailGenerator;