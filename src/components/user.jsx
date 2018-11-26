import React, { Component } from 'react'
import axios from 'axios'

import config from './../config';

export default class User extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            videos: ""
        }
    }

    componentWillMount() {
        // settimeout for UX
        setTimeout(() => {
            axios({
                url: `${config.backendUrl}/videonum/${this.props.id}`,
                method: 'GET'
            }).then(response => {
                this.setState({
                    videos: response.data.number
                })
            }).catch(err => {
                console.log(err)
            })
        }, 500)
    }

    render() {
        return (
            <tr>
                <td>{this.props.fname}</td>
                <td>{this.props.lname}</td>
                {this.state.videos === "" ? (
                    <td><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></td>
                ) : (
                    <td>{this.state.videos}</td>
                )}
            </tr>
        )
    }
}
