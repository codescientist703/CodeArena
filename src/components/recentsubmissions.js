import React from 'react'
import Timer from './timer'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import axios from 'axios'
import Data from './recentdata'

const Styles = styled.div`



`;

class Recent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: localStorage.getItem('refresh_token'),
			data: [],
			status: false,
			rsname: localStorage.getItem('cur_contest')
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
        	status: true
        })
      })
	}
	render() {
		if(this.state.status === false){
			return(
				<div>
					Loading.....
				</div>
			)
		}
		return(
			<Styles>
		      <Table responsive hover striped  >
					<thead>
				    	<th>Date</th>
				    	<th>username</th>
				    	<th>Problem</th>
				    	<th>Result</th>
				    	<th>Language</th>
					</thead>
					<tbody>
				    {this.state.data.result.data.content.map(problist => (
				    	<tr>
					    	<td className="date">{problist.date}</td>
					    	<td>{problist.username}</td>
		                    <td>{problist.problemCode}</td>
		                    <td>{problist.result}</td>
		                    <td>{problist.language}</td>
					    </tr>
				    ))}
				    </tbody>
			    </Table>
	        </Styles>
		)
	}
}
export default Recent