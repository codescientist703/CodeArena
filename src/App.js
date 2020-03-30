import React from 'react'
import Login from './components/login-form'
import About from './components/about'
import Navu from './components/navbar'
import Contest from './components/contest-page'
import MyAppText from './myAppText'
import Dashboard from './components/dashboard'
import Problem from './components/problempage'
import Test from './components/test'
import Ranklist from './components/ranklist'
import Loader from './components/loader'
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Recent from './components/recentsubmissions'

class App extends React.Component{
	constructor(){
		super()
		this.state = {
		}
		//this.handleClick = this.handleClick.bind(this)
	}
	render() {
		return (
			<Router>
			<div>
			<Navu />
			<MyAppText>
			 <Switch>
				<Route path='/' exact component={About} />
				<Route path='/login' component={Login}  />
				<Route path='/dashboard' exact component={Dashboard}  />
				<Route path='/dashboard/:id' exact component={Contest}  />
				<Route path='/dashboard/:id/ranklist' exact component={Ranklist}  />
				<Route path='/dashboard/:id/:id' component = {Problem} />
			</Switch>
		
			</MyAppText>
			</div>
			</Router>
		)
	}
}
export default App