import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import myAppStore from './redux/store/store';
import {BrowserRouter, Route, Link, HashRouter, Switch, NavLink} from 'react-router-dom';
import {Router} from 'react-router';
import Demo from './components/demo';
import RenderTreeDemo from './components/renderTree';
import {CustomForm} from './components/refDemo';
import Pagination from './components/Pagination';
import TextFields from './components/input';
import ComboBox from './components/comboBox';
import Button from '@material-ui/core/Button';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import {theme} from './constant'
import {IndexPage} from './components/puredemo';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
	inputTest:{
		backgroundColor:'red',
	}
}));


function App() {
	const classes=useStyles();
	const [comBox, setComBox] = useState();
	const [dataSource, setDataSource] = useState([]);

	function handleComBoxChange(value) {
		setComBox(value)
	}

	useEffect(() => {
		setDataSource([
			{key: 'key1', value: 'value1', option: {q: 'w'}, option1: ['q', 'w']},
			{key: 'key2', value: 'value2', option: {a: 1}}]);
	}, []);

	function handleClickDiv() {
		console.log('div')
	}

	function handleClickButton() {
		console.log('button')
	}

	return (
		<>
		<ThemeProvider theme={theme}>
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

			<div className="container">
				<div style={{width: '100px'}}>q</div>
				<div className="div5 div">width和height</div>
				{/*<div class="div5 div">width和height</div>*/}
				<DIV style={{width: '100px'}}>q</>

				<div style={{width: '100px'}}>q</div>

				<div style={{width: '100px'}}>q</div>
				{/*<Pagination/>*/}
			</div>

			<Provider store={myAppStore}>
				<BrowserRouter>
					<CustomForm/>
					<Route path="/about" component={About}/>
					<Route path="/demo" component={Demo}/>
					<Route path="/renderTree" component={RenderTreeDemo}/>
					<Route path="/pure" component={IndexPage}/>
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
			{/*<Pagination total={10} pageSize={3}/>*/}
			<TextFields/>
			<ComboBox value={comBox} SelectProps={{native: false}} onChange={handleComBoxChange} dataSource={dataSource}
					  propertyName={'key'} classes={{
				input:classes.inputTest
			}}
					  propertyValue={'option'}/>
			<div >
				<div onDoubleClick={handleClickDiv} onClick={handleClickButton}>ui</div>
			</div>
		</div>
		</ThemeProvider>

</>
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
