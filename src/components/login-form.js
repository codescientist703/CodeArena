import React from 'react'
import { Button, Form} from 'reactstrap'
import styled from 'styled-components'


const Styles = styled.div`
    button {
    	position:relative;
    	top: 100px;
    	padding: 10px;

    }
    form {
		width: 100%;
		max-width: 330px;
		margin: auto;s
		height: 100%;
    }
    h3{
    	color: #440EA7;
    	text-align: center;
    	padding: 30px;
    	font-family: "Times New Roman", Times, serif;
    }
    .login-box{
    	 height: 90vh;
    	 width: 120%;
    	 background-color: #F4EEFF;
    	 box-shadow: 5px 5px 8px 8px #0F9DF1;
    	 padding: 10px;
    	 text-align: center;
         display: block;
    }

`;

class Login extends React.Component{
	constructor(){
		super()
		this.state = {
			isLogged: 'false',
		}
	}
	handleFormSubmit( event ) {
        //event.preventDefault();
       // console.log(this.state);
       localStorage.setItem('isLogged', 'true');
        this.setState({
			isLogged: 'true',
	     })
        window.location.assign('http://127.0.0.1/codechef.php');
    }
	render() {
		return (
		    <Styles>

			<Form>
			   <div className="login-box">
			   <h3 className="">Welcome to my CodeArena</h3>
			    <img src={process.env.PUBLIC_URL + "/codeicon.jpg"} width="170px"/>
			   <Button className="btn-lg btn-success btn-block"
			   onClick={e => this.handleFormSubmit(e)}>Log in with codechef</Button>
			   </div>
			</Form>
		    </Styles>
	
		)
	}
}
export default Login