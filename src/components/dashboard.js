import React from 'react'
import styled from 'styled-components'
import { Button, Input} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import BigData from './autodata.json'


const Styles = styled.div`
h2 {
	text-align: center;
	padding: 30px;

}
button{
	display: block;
    margin : 0 auto;
    margin-top: 30px;		
}
input {
	width: 70%;
	display: block;
    margin : 0 auto;
    font-size: 20px;
    border: none;
    box-sizing: border-box;
    outline: none;
}

.sug-box {
	width: 70%;
    display: block;
    margin : 0 auto;
    background-color: white;
    font-size: 20px;
    box-shadow: 5px 5px #888888;
}
.sug-box ul {
	list-style-type: none;
	text-align: left;
	margin: 0;
	padding: 0;
}
.sug-box ul :: before{
	content: ""
}
.sug-box li {
	padding: 10px 5px;
	cursor: pointer;
}
.sug-box li:hover{
	text-decoration:underline;
}

`;

class Dashboard extends React.Component{
	urll = window.location.href
	slug = this.urll.split('?').pop();

	constructor(){
		super()
		if(localStorage.getItem('first_time') != 'true')
		{
			localStorage.setItem('refresh_token', this.slug)
			localStorage.setItem('first_time', 'true')
		}
		/**this.items = [
	        'David',
	        'Hi',
	        'ha',
	        'hu'
	    ]  **/      
	    this.state = {
        	suggestions: [],
			cname: '',
			items: BigData.result.data.content.contestList.map(function(item){
				return  item.code
			})
		}
		//this.onTextChanged = this.onTextChanged.bind(this);
	}
	onTextChanged = (e) => {
		this.setState({ cname: e.target.value })
		console.log(e.target.value)
		const value = e.target.value
		let suggestions = []
		if(value.length > 0){
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = this.state.items.sort().filter(v => regex.test(v))
			
		}
		this.setState(() => ({suggestions}));
	}

	renderSuggestions() {
		const { suggestions } = this.state
		if(suggestions.length === 0){
			return null;
		}
		return (
			<ul>
			    {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
			</ul>
		);
	}
	suggestionSelected(value) {
		this.setState({
			cname: value,
			suggestions: []
		})
	}
	
	render() {
		return (
			<div>
		    { 
		    localStorage.getItem('isLogged') === 'true'
		    ? (<Styles>
		    	
			    <h2>Enter any contest name: </h2>
			    <Input type="text" onChange={this.onTextChanged} value={this.state.cname}/> 
			    <div className="sug-box">{this.renderSuggestions()}</div>
			   <Link to={`/dashboard/${this.state.cname}`}> <Button>Click to access contest</Button></Link>
		      </Styles>
		    )
		    : (<h2>You are not allowed to view this page</h2>)
		    }
		   </div>
		   
		)
	}
}
export default Dashboard