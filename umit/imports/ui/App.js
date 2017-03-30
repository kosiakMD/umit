/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/26/17
 * Time: 01:06
 */

import React, { Component, PropTypes } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class App extends Component {

    render() {

        return (
            <div id="indexPage">
                <h1>Welcome to the Page</h1>

                <NavLink to="/todo">Todo</NavLink>
                <NavLink to="/todo">NavLink Todo</NavLink>
                <NavLink to="/icpc">NavLink ICPC</NavLink>

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

}