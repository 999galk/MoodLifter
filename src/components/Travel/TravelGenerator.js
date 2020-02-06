import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { destinations } from './destinations';


class TravelGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex : 0,
      userCountryCode : '',
      randomId : '',
      destinationCode : '',
      destinationName : '',
      linkInfo : '',
      imageLink : '',
      departure_date: '',
      return_date : '',
      linkFlight : '',
      suggestedDest : [],
      suggestionsShow : 'hide'
    }
  }

setActiveSlideIndex = (newActiveSlideIndex) => {
	    this.setState({
	      activeSlideIndex: newActiveSlideIndex
	    });
}

fetchUserCountry = () => {
		fetch('https://ipapi.co/json/')
					.then(res => res.json())
					.then(data => {
						if(data.country_code_iso3 === 'ISR'){
							this.setState({userCountryCode : 'TLV'});
						} else {
							this.setState({userCountryCode : data.country_code_iso3 });
						}});
}

updateDestParams = () => {
	const min = destinations[0].id;
	const max = destinations[destinations.length-1].id;
	this.setState({ randomId : parseInt(Math.random() * (max - min) + min)}, () => this.setDestParams());
}

setDestParams = () => {
	const id = this.state.randomId;
	this.setState ({destinationCode : destinations[id].countryCode, 
					destinationName : destinations[id].name,
					linkInfo : destinations[id].linkInfo,
					imageLink : destinations[id].imageLink
				}, () => this.keepInArray(id))
}

keepInArray = (id) => {
	let wasSuggested = false;
	(this.state.suggestedDest).forEach(dest =>{
		if(dest.destId === id){
			wasSuggested = true;
		}
	})
	if(!wasSuggested){
		const newDest = {
			destinationName : this.state.destinationName,
			imageLink : this.state.imageLink,
			destId : id
		}
		const joined = this.state.suggestedDest.concat(newDest);
		this.setState({suggestedDest : joined});
	}	
}

unhideSuggestions = () => {
  		const div = document.getElementById('suggestions');
  		if(div && this.state.suggestedDest.length > 0){
  			if(div.className==='hide'){
  				div.className='unhide';
  			}
  		}
}

changeBack = (event) => {
  		const i = event.target.id;
  		//const id = destinations[i].destId;
  		this.setState ({destinationCode : destinations[i].countryCode, 
					destinationName : destinations[i].name,
					linkInfo : destinations[i].linkInfo,
					imageLink : destinations[i].imageLink
				}, this.handleOnClick(event))
}

handleOnClick = (event) => {
  		let sugDiv;
  		if(event.target.id === 'downArrow'){
  			sugDiv = document.getElementById('suggestions');
  			if(sugDiv.className === 'hide'){
  				sugDiv.className = 'unhide';
  			}
  		} else{
  			sugDiv = document.getElementById('chosen');
  		}
		sugDiv.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

appendLeadingZeroes = (n) => {
  if(n <= 9){
    return "0" + n;
  }
  return n
}

setFlightDates = () => {
	const current_datetime = new Date();
	const formatted_dep_date = current_datetime.getFullYear() + "-" + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + this.appendLeadingZeroes(current_datetime.getDate());
	const returnDate = new Date(Date.now() + 12096e5);
	const formatted_return_date = returnDate.getFullYear() + "-" + this.appendLeadingZeroes(returnDate.getMonth() + 1) + "-" + this.appendLeadingZeroes(returnDate.getDate());
	this.setState({departure_date : formatted_dep_date, return_date : formatted_return_date});
}

componentDidMount(){
	this.fetchUserCountry();
	this.updateDestParams();
	this.setFlightDates();	
	window.onpopstate = this.props.onBackButtonEvent;			
}


render() {
	const {userCountryCode, destinationCode, departure_date, return_date,imageLink,destinationName,linkInfo} = this.state;
	const linkFlight = `https://www.kayak.com/flights/${userCountryCode}-${destinationCode}/${departure_date}/${return_date}?sort=bestflight_a`;
	return (
		<div style={{display:'flex', flexDirection:'column'}}>
		<div id='chosen' className='center card-bg fade-in br3 pa4 ma2 mb5 dib bw2 shadow-5'>
			<div>
				<h1>Your chosen destination is:</h1>
			</div>
			<div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
				<div style={{maxWidth:'30rem', maxHeight:'30rem'}}>
	      		<img alt='dest' src={imageLink} style={{width:'100%'}}/>
	      		</div>
	      		<div className='mw5 mw7-ns ph5-ns'>
			        <h2 className='pa2'>{destinationName}</h2>
			        <div className='pt2'>
			        	<a className='f4' href={linkInfo} target="_blank" rel="noopener noreferrer"> Get More info about {destinationName} </a> 
			        </div>
			        <div className='pt3'>
			        	<a className='f4' href={linkFlight} target="_blank" rel="noopener noreferrer"> Book a flight now! </a> 
			        </div>
			        <p className='mt5'>Not for you?</p>
			        <img alt='downArrow' id='downArrow' className='pointer' src='https://cdn4.iconfinder.com/data/icons/colorful-basic-arrows/515/arrow_down_circle_darkblue-512.png' width='50px' height='50px' onClick={this.handleOnClick}/> 
			    </div>
			</div>
	    </div>
	    <div id='suggestions' className='hide'>
		    <hr/>
		    <h2 className='mt2'> More Suggestions:</h2>
		    <div className='br3 pa3 ma2 mb5 dib bw2 shadow-5' style={{maxWidth:'85%'}}>
		    	<Carousel
		    	>
			    {Array.from(destinations).map((item, index) => (
		    		<div key={index} id={index} className='bw2 shadow-5 pointer' style={{marginLeft:'auto'}} onClick={this.changeBack}>
		    			<h3 style={{color:'white',marginTop:'25px'}}> {destinations[index].name} </h3>
		            	<img className='pointer' alt='dest' id={index} src={destinations[index].imageLink}/>
		          	</div>  
			    ))}
		      </Carousel>
		      </div>
		    </div>
		    </div>
	);
}
}

export default TravelGenerator;