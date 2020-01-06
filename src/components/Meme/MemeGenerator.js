import React from 'react';
import './Card.css';

class MemeGenerator extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			memeImg : ''
		}
	}

	fetchMeme = () => {
		fetch("https://meme-api.herokuapp.com/gimme")
					.then(res => res.json())
					.then(meme => {
						this.setState({memeImg : meme.url})
					})
	}

	componentDidMount(){
		this.fetchMeme();
		window.onpopstate = this.props.onBackButtonEvent;
	}

	render(){
		return (
			<div className='card-bg fade-in br3 pa4 ma2 mb5 dib bw2 shadow-5'>
				<div>
					<h2>Here is a Meme for you:</h2>
				</div>
				<div className='pl5' style={{display:'flex', marginLeft:'75px', position:'relative'}}>
					<div>
		      		<img alt='joke' src={this.state.memeImg} width='400px' height='auto'/>
		      		</div>
		      		<div className='pa3' style={{width:150}}>
		      			<button className='grow white b bg-navy bn br-pill' 
		      					style={{
		      						position:'absolute',top:'35%',left:'75%',width:140,
						            alignSelf: 'center',
						            backgroundColor: 'Transparent',
								    backgroundRepeat :'no-repeat',
								    border : 'none',
								    cursor : 'pointer',
								    overflow : 'hidden',
								    outline: 'none'
						        }} 
						>
		      			<img alt='arrow' className='grow' src="http://www.2do.rs/wp-content/uploads/2017/09/arrow-right-blue.svg" onClick={this.fetchMeme} style={{width:140, height:140}}/>
		      			</button>
		      		</div>
	      		</div>
		    </div>
		);
	}
	
}

export default MemeGenerator;