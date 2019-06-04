import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import myAppStore from './redux/store/store';
import {BrowserRouter, Route, Link, HashRouter, Switch, NavLink} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<header className="App-header">
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
			</header>
			<Provider store={myAppStore}>
				<BrowserRouter>
					<Route path="/about" component={About}/>
				</BrowserRouter>
				<HashRouter></HashRouter>
				<Switch></Switch>
				<Route exact path='/' component={Home}/>
				<Route component={Always}/>
				<Link to='/about'>about</Link>
				<NavLink to='/about' activeClassName='hurray'>navLink</NavLink>
			</Provider>
		</div>
	);
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
