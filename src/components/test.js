import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const API_PATH = 'http://127.0.0.1/contest.php'


export default class Test extends React.Component{
	constructor(){
		super()
		this.state = {
			datu: '12345566'
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
        console.log(res)
      });
	  }

	render() {
		return (
		  <div>
		  </div>
		)
	}
}
