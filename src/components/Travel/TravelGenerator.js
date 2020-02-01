import React from 'react';
import Carousel from 'react-simply-carousel';
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
      suggestedDest : []
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
				})
}

handleOnClick = (event) => {
    const sugDiv = document.getElementById('suggestions');
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
		<div>
		<div className='card-bg fade-in br3 pa3 ma2 mb5 dib bw2 shadow-5'>
			<div>
				<h1>Your chosen destination is:</h1>
			</div>
			<div className='flex'>
	      		<img alt='dest' src={imageLink} width='450px' height='350px' className='ma3'/>
	      		<div className='pa5'>
			        <h2 className='pa2'>{destinationName}</h2>
			        <div className='pt2'>
			        	<a className='f4' href={linkInfo} target="_blank" rel="noopener noreferrer"> Get More info about {destinationName} </a> 
			        </div>
			        <div className='pt3'>
			        	<a className='f4' href={linkFlight} target="_blank" rel="noopener noreferrer"> Book a flight now! </a> 
			        </div>
			        <p className='mt5'>Not for you?</p>
			        <img alt='downAroow' className='pointer' src='https://cdn4.iconfinder.com/data/icons/colorful-basic-arrows/515/arrow_down_circle_darkblue-512.png' width='50px' height='50px' onClick={this.handleOnClick}/> 
			    </div>
			</div>
	    </div>
	    <div id='suggestions'>
		    <hr/>
		    <h2 className='mt2'> More Suggestions:</h2>
		    <div className='br3 pa3 ma2 mb5 dib bw2 shadow-5' style={{maxWidth: '67%'}}>
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
			    {Array.from(destinations).map((item, index) => (
		    		<div key={index} id='activeItem' style={{width:350}} className='bw2 shadow-5'>
		    			<h3> {destinations[index].name} </h3>
		            	<img className='pointer' alt='dest' id={index} src={destinations[index].imageLink} style={{width:300, height:300}}
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

export default TravelGenerator;