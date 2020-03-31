import React from 'react'
import Timer from './timer'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import axios from 'axios'
import problems from './probdetails'
import Loader from './loader'
import Errorr from './error'

const Styles = styled.div`
p {
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 20px;
}
li{
	font-size: 18px;
	font-family: 'Roboto Condensed', sans-serif;
}
button{
	width: 100%;
}
.col-md-4{
	padding: 100px;
}
.col-md-8 {
	padding: 30px;
}
   
`;

class Problem extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.match)

		this.state = {
			status: 'false',
			id: localStorage.getItem('refresh_token'),
			data: [],
			pname: this.props.match.params.id,
			cname: localStorage.getItem('cur_contest')
		}
	}
	componentDidMount(){
        axios({
	      url: "http://localhost:8000/contest.php",
	      method: 'post',
	      headers: { Accept: 'application/json'},
	      data: this.state,
	    })

      .then(res => {
      	console.log(res.data)
      	localStorage.setItem('refresh_token',res.data.refresh_token)
        this.setState({
        	data: res.data,
        	status: res.data.status
        })
      })
	}
	render() {
		if(this.state.status === 'false'){
			return (
				<div>
				<Loader/>
				</div>
			)
		}
		else if(this.state.status === 'error' || this.state.status === 'FORBIDDEN'){
			return (
				<Errorr />
			)
		}
		let body = this.state.data.result.data.content.body
		return (
			<Styles>
				<div className="row">
					<div className="col-md-8">
						<h3>Problem Statement:</h3>
						<br/>
						<div  dangerouslySetInnerHTML={{__html: body}} />
					</div>
					<div className="col-md-4" >
					    <button className="btn-primary">Submit</button>
					</div>
				</div>
		    </Styles>
		)
	}
}
export default Problem