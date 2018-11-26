import React, { Component } from 'react';
import './App.css';
import User from './components/user';
import axios from 'axios'

import config from './config';

import 'bulma/css/bulma.css'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			numberOfData: 0,
			usersList: [],
			selectedPage: 1
		}
	}

	componentWillMount() {
		// settimeout for UX
		setTimeout(() => {
			axios({
				url: `${config.backendUrl}/getusers/1`,
				method: 'GET'
			}).then((response) => {
				const usersList = response.data.data;
				const numberOfData = Number(response.data.count);
				//use callback
				this.setState({
					usersList,
					numberOfData
				})
			}).catch(err => {
				console.log(err)
			})
		}, 500)
	}

	changePage = (page) => {
		this.setState({
			usersList: [],
			selectedPage: Number(page)
		}, () => {
			setTimeout(() => {
				axios({
					url: `${config.backendUrl}/getusers/${page}`,
					method: 'GET'
				}).then((response) => {
					const usersList = response.data.data;
					const numberOfData = Number(response.data.count);
					this.setState({
						usersList,
						numberOfData
					})
				}).catch(err => {
					console.log(err)
				})
			}, 200)
		})
	}
	
	render() {
		let numberOfPages = 0;
		if (this.state.numberOfData > 0) {
			numberOfPages = Math.ceil(this.state.numberOfData/25);
		}

		return (
			<div className="App">
				<div className="title">Videos details</div>
				{this.state.usersList.length > 0 ? (
					<table className="table mytable">
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>No of videos</th>
							</tr>
						</thead>
						<tbody>		
							{this.state.usersList.map((user, i) => {
								return(
									<User key={i} fname={user.fname} lname={user.lname} id={user.id} />
								)
							})}
						</tbody>
					</table>
				) : (
					<div className="lds-facebook"><div></div><div></div><div></div></div>
				)}
				
				<div className="pagination">
					{[...Array(numberOfPages)].map((e, i) => <div className="pagination" key={i} id={i+1} onClick={(e) => {
						this.changePage(e.target.id);
						console.log(e.target.id);
					}}>{this.state.selectedPage === i+1 ? (
						<span id={i+1} className="selectedPage">{i+1}</span>
					) : (
						<span id={i+1} className="nonSelectedPAge">{i+1}</span>
					)}</div>)}
				</div>
			</div>
		);
	}
}

export default App;
