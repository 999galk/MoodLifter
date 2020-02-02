import React, { Component } from 'react';
import CocktailCard from '../components/Cocktails/CocktailCard';
import CocktailGenerator from '../components/Cocktails/CocktailGenerator';
//import MemeCard from '../components/Meme/MemeCard';
//import MemeGenerator from '../components/Meme/MemeGenerator';
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
					<h1 className='f1'> Welcome! </h1>
					{ route === '/home'
					?<div> 
					<p className='f3'>Had a raugh day? Looking for a crazy adventure that will help you forget it?</p><p className='f3'>This is the place for you! </p> 
						<ErrorBoundary>
							<div style={{display:'flex',justifyContent:'center', flexWrap: 'wrap'}}>
							<Link to='cocktail'><CocktailCard onRouteChange={this.onRouteChange} /></Link>
							<Link to='travel'><TravelCard onRouteChange={this.onRouteChange}/></Link>
							</div>
						</ErrorBoundary>
						</div>
			        : ( route === '/cocktail'
			        		? <CocktailGenerator onBackButtonEvent={this.onBackButtonEvent}/>
			        		: <TravelGenerator onBackButtonEvent={this.onBackButtonEvent}/>
		        		)
					}
				</div>
			</Router>
		);
	}
}

export default App;