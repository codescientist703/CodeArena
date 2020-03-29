import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
    margin; 0 auto;
    p{
    	font-family: "Comic Sans MS";
    	font-size: 19px;
    }
    h3{
    	background-color: orange;
    	width: 80%;
    }
`;

class Timer extends React.Component{
	constructor(){
		super()
		this.state = {
            hours: 3,
			minutes: 0,
            seconds: 0,
		}
	}

	componentDidMount() {
		this.myInterval = setInterval(() => {
			const { hours, minutes, seconds } = this.state
            
            if(seconds > 0){
            	this.setState(({ seconds }) => ({
			        seconds: seconds - 1
			}))
            }
			if (seconds === 0) {
		        if (minutes === 0 && hours === 0) {
		            clearInterval(this.myInterval)
			    }
			    else if(minutes === 0){
			    	if(hours > 0) {
		        	this.setState( ({hours}) => ({
		        		hours: hours - 1,
		        		minutes: 59,
		        		seconds: 59
		        	}))
		            }
			    }
			    else {
			        this.setState(({ minutes }) => ({
			        minutes: minutes - 1,
			        seconds: 59
			    }))
			  }
			}
		}, 1000)
    }  

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

	render() {
		const { hours, minutes, seconds } = this.state
		return (
		  <Styles>
		  <p>Countdown:</p>
		  <h3>{hours}: {minutes < 10 ? `0${minutes}` : minutes}: {seconds < 10 ? `0${seconds}` : seconds}</h3>
		  </Styles>
		)
	}
}
export default Timer