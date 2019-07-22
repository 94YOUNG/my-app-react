import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import myAppStore from './redux/store/store';
import {BrowserRouter, Route, Link, HashRouter, Switch, NavLink} from 'react-router-dom';
import {Router} from 'react-router';
import Demo from './components/demo';
import RenderTreeDemo from './components/renderTree';
import {CustomForm} from './components/refDemo';

function App() {
	return (
		<div className="App">
{/*			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>*/}
			<Provider store={myAppStore}>
				<BrowserRouter>
					<CustomForm />
					<Route path="/about" component={About}/>
					<Route path="/demo" component={Demo}/>
					<Route path="/renderTree" component={RenderTreeDemo}/>
				</BrowserRouter>
				{/*<HashRouter></HashRouter>*/}
				{/*/!*<Switch></Switch>*!/*/}
				{/*<Router>*/}
				{/*	<Route exact path='/' component={Home}/>*/}
				{/*	<Route component={Always}/>*/}
				{/*</Router>*/}

				{/*<Link to='/about'>about</Link>*/}
				{/*<NavLink to='/about' activeClassName='hurray'>navLink</NavLink>*/}
				{/*<Link to="/" innerRef={refCallback} />*/}

				{/*<Link to="/" innerRef={anchorRef} />*/}
				{/*<NavLink*/}
				{/*	to="/faq"*/}
				{/*	activeStyle={{*/}
				{/*		fontWeight: "bold",*/}
				{/*		color: "red"*/}
				{/*	}}*/}
				{/*>*/}
				{/*	FAQs*/}
				{/*</NavLink>*/}
				{/*/!*尾斜杠*!/*/}
				{/*<NavLink strict to="/events/">*/}
				{/*	Events*/}
				{/*</NavLink>*/}



				{/*<NavLink*/}
				{/*	to="/events/123"*/}
				{/*	isActive={oddEvent}*/}
				{/*>Event 123</NavLink>*/}
			</Provider>
		</div>
	);
}
const oddEvent = (match, location) => {
	if (!match) {
		return false
	}
	const eventID = parseInt(match.params.eventID)
	return !isNaN(eventID) && eventID % 2 === 1
}


const anchorRef = React.createRef()
const refCallback = node => {
	console.log(node)
	// `node` refers to the mounted DOM element or null when unmounted
}

function Home() {
	return (<div>Home</div>)
}

function About() {
	return (<div>About</div>)
}

function Always() {
	return (<div>Always</div>)
}
export default App;
