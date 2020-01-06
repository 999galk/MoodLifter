import React, { Component } from 'react';
import CocktailCard from '../components/Cocktails/CocktailCard';
import CocktailGenerator from '../components/Cocktails/CocktailGenerator';
import MemeCard from '../components/Meme/MemeCard';
import MemeGenerator from '../components/Meme/MemeGenerator';
import TravelCard from '../components/Travel/TravelCard';
import TravelGenerator from '../components/Travel/TravelGenerator';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header/Header';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import './App.css';

class App extends Component{
	constructor(){
		super()
		this.state = {	
			route : '/home'
		}
	}

	onBackButtonEvent = (event) => {
	  event.preventDefault();
	 this.onRouteChange('/home');
	}
	
	componentDidMount(){
		window.onpopstate = this.onBackButtonEvent;				
	}

	onRouteChange = (route) => {
    	this.setState({route: route});
  	}
	
	render(){
		const { route } = this.state;
		return (
			<Router>
				<div className='tc'>
					<Header />
					<h1 className='f1'> MoodLifter </h1>
					{ route === '/home'
					?<div> 
					<p className='f3'> Here for your toughest days </p> 
						<ErrorBoundary>
							<Link to='meme'><MemeCard onRouteChange={this.onRouteChange} /></Link>
							<Link to='cocktail'><CocktailCard onRouteChange={this.onRouteChange} /></Link>
							<Link to='travel'><TravelCard onRouteChange={this.onRouteChange}/></Link>
						</ErrorBoundary>
						</div>
			        : ( route === '/meme'
			        	? <MemeGenerator onBackButtonEvent={this.onBackButtonEvent}/>
			        	: ( route === '/cocktail'
			        		? <CocktailGenerator onBackButtonEvent={this.onBackButtonEvent}/>
			        		: <TravelGenerator onBackButtonEvent={this.onBackButtonEvent}/>
			        		)
			        	)
					}
				</div>
			</Router>
		);
	}
}

export default App;