import React from 'react'
import {Link} from 'react-router-dom'
import Timer from './timer'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import axios from 'axios'
import Loader from './loader'
import Recent from './recentsubmissions'

const Styles = styled.div`
    h4 {
    	color: purple;
    	padding: 20px;
    	margin-left: 10px;
    }
    button{
    	padding: 5px;
    	width: 100%;	
    	
    }
    table {
    	width: 100%;
    	box-shadow: 5px 10px #888888;
    }
    td {
    	padding: 10px;
    }
    th {
    	padding: 10px;
    	background-color: green;
    }
    .rank-box{
    	padding: 30px;
    	margin-left: 23px;
    	margin-top: 50px;
    	border-style: solid;
        border-width: 1px;
    }
    .timer-box{
    	padding-top: 20px;
    	padding-bottom: 20px;
    	padding-left: 31px;
    	padding-right: 1px;
    	margin-left: 23px;
    	border-style: solid;
        border-width: 1px;

    }
    .table-box{
    	padding: 30px;
    	margin-left: 10px;
    	border-style: solid;
        border-width: 1px;
        border-radius: 10px;

    }
    .recent-box{
         padding-top: 70px;
         padding-left: 20px;

    }
    .recent-box table{
		width: 10%;
		font-size: 10px;
		box-shadow: none;
	}	
	.recent-box td {
        padding: 0px;
    }
    .recent-box th {
        padding: 2px;
    }
    .recent-box button {
    	padding: 1px;
        width: 100%;
        color: #1A1A30;
        background-color: #82C8FF;
    }

`;

class Contest extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.match)
		localStorage.setItem('cur_contest', this.props.match.params.id)
		this.state = {
			status: false,
			status1: false,
			id: localStorage.getItem('refresh_token'),
			data: [],
			cname: this.props.match.params.id
		}
		//this.handleClick = this.handleClick.bind(this)
	}
	handleChange = () => {
		this.setState(prevState => ({
			status1: !prevState.status1
		}))
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
        	status: true
        })
      })

	  }

	render() {
		if(!this.state.status){
			return (
				<div>
				<Loader/>
				</div>
			)
		}
		return (
			<Styles>
			<h4>Scorable Problems </h4>
			<div className="row">
				<div className="col-md-9 col-sm-6 ">
				<div className="table-box">
				<Table responsive hover striped  >
					<thead>
				    	<th>Problem Codes</th>
				    	<th>Successful Submissions</th>
				    	<th>Accuracy</th>
					</thead>
					<tbody>
				    {this.state.data.result.data.content.problemsList.map(problist => (
				    	<tr>
					    	<Link to={`/dashboard/${this.state.cname}/${problist.problemCode}`}><td>{problist.problemCode}</td></Link>
		                    <td>{problist.successfulSubmissions}</td>
		                    <td>{problist.accuracy.toFixed(2)}</td>
					    </tr>
				    ))}
				    </tbody>
			    </Table>
			    </div>
			    </div>
			    <div className="col-md-3 col-sm-6">
			        <div className="timer-box">
			            <Timer />
			        </div>
			        <div className="rank-box">
			        <Link to={`/dashboard/${this.state.cname}/ranklist`}><button className="btn-primary">Ranklist</button></Link>
			        </div>
			        <div className="recent-box">
			            <button onClick={this.handleChange}>View Recent submissions</button>
				        {this.state.status1 
				        	? <Recent />
				        	: <div></div>
				        }
			        </div>
			    </div>
			     
		    </div>
		    </Styles>
		)
	}
}
export default Contest