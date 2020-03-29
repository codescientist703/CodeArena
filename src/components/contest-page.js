import React from 'react'
import {Link} from 'react-router-dom'
import Timer from './timer'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import axios from 'axios'
import Loader from './loader'

const Styles = styled.div`
    h4 {
    	color: purple;
    	padding: 20px;
    	margin-left: 40px;
    }
    button{
    	padding: 5px;
    	width: 84%;	
    	max-width: 100%;
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
    	margin-left: 60px;
    	margin-top: 50px;
    	border-style: solid;
        border-width: 1px;
    }
    .timer-box{
    	padding-top: 20px;
    	padding-bottom: 20px;
    	padding-left: 31px;
    	padding-right: 1px;
    	margin-left: 60px;
    	border-style: solid;
        border-width: 1px;

    }
    .table-box{
    	padding: 30px;
    	margin-left: 60px;
    	border-style: solid;
        border-width: 1px;
        border-radius: 10px;

    }
   
`;

class Contest extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.match)
		localStorage.setItem('cur_contest', this.props.match.params.id)
		this.state = {
			status: false,
			id: localStorage.getItem('refresh_token'),
			data: [],
			cname: this.props.match.params.id
		}
		//this.handleClick = this.handleClick.bind(this)
	}

    componentDidMount(){
        axios({
	      url: "http://127.0.0.1/contest.php",
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
      .catch(error => {
     
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
			<h4>Scorable Problems -</h4>
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
			    </div>
			     
		    </div>
		    </Styles>
		)
	}
}
export default Contest