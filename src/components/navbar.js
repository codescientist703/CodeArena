import React from 'react'
import { Navbar,Nav,NavItem,NavLink,NavbarBrand} from 'reactstrap'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Styles = styled.div`
    .navbar {
        background-color: #1B262C;
		width: 100%;
        
    }
    .navbar-brand, .navbar-nav, .nav-link{
    	color: white;
    	font-family: 'Roboto Mono';
    }
`;

class Navu extends React.Component {
	constructor(){
		super()
		this.state = {
			isLogged: localStorage.getItem('isLogged') === 'true' ? 'true' : 'false'
		}
		this.onLogout = this.onLogout.bind(this);
	}
	onLogout(){
		localStorage.setItem('isLogged','false')
		localStorage.setItem('first_time','false')
		this.setState({
			isLogged: 'false'
		})
	}
	render() {

		return (
		<Styles>
			<Navbar >
				<NavbarBrand href=''>Code Arena</NavbarBrand>
				<Nav className="ml-auto">
					<Link to='/about'><NavItem><NavLink >About</NavLink></NavItem></Link>
					<Link to='/dashboard'><NavItem><NavLink >Dashboard</NavLink></NavItem></Link>
					 { this.state.isLogged === 'true' ? <Link to='/login' onClick={this.onLogout}><NavItem><NavLink>Logout</NavLink></NavItem></Link>
					  : <Link to='/login'><NavItem><NavLink >Login</NavLink></NavItem></Link>
				    }
				</Nav>
			</Navbar>
		</Styles>
		)
	}
}

export default Navu