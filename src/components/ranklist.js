import React from 'react'
import styled from 'styled-components'
import Ranks from './ranks'
import ReactTable from 'react-table-v6' 
import 'react-table-v6/react-table.css'
import axios from 'axios'
import Loader from './loader'
import Errorr from './error'

const Styles = styled.div`
    width: 80%;
`;
class Ranklist extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.match)
		this.state = {
			status: 'false',
			id: localStorage.getItem('refresh_token'),
			data: [],
			rname: localStorage.getItem('cur_contest')
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
        	data: res.data.result.data.content,
        	status: res.data.status
        })
      })
	}
	render() {
		const columns = [
		{
			Header: 'Rank',
			accessor: 'rank',
			style: {
				textAlign: "center"
			}
		},
		{
			Header: 'User-Name',
			accessor: 'username',
			style: {
				textAlign: "center"
			}
		},
		{
			Header: 'Total-Time',
			accessor: 'totalTime',
			filterable: false,
			style: {
				textAlign: "center"
			}
		},
		{
			Header: 'Total-Score',
			accessor: 'totalScore',
			filterable: false,
			style: {
				textAlign: "center"
			}
		},
		]
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
		return (
			<Styles>
			<ReactTable columns={columns} data={this.state.data}  defaultPageSize = {14}  className="-striped -highlight" filterable >
			</ReactTable>
			</Styles>
		)
	}
}
export default Ranklist