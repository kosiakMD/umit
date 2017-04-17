/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 4/17/17
 * Time: 01:01
 */

import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
// import { browserHistory } from 'react-router';
import { Segment, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

export default class TopMenu extends Component {

    constructor(props) {
        super();
        autoBind(this);
        // console.log(this.constructor.name, props);
        this.state = {
            activeItem: '',
        }
    }

    handleItemClick(e, targetProps) {
        // e.preventDefault();
        // console.log(arguments);
        let { to, name } = targetProps;
        this.setState({activeItem: to});
        // history.pushState(path, name);
        // browserHistory.push(path);
    }

    render() {
        let { activeItem } = this.state;
        return (
            <div>
                {/*<Segment inverted>*/}
                    {/*<Menu inverted pointing secondary >*/}
                    {/*<Menu color={'teal'} inverted widths={3}>*/}
                    <Menu color={'teal'} inverted >
                        <Menu.Item name='Home' as={Link} to={'/'} active={activeItem === '/'} onClick={this.handleItemClick}/>
                        <Menu.Item name='ICPC' as={Link} to={'/icpc'} active={activeItem === '/icpc'} onClick={this.handleItemClick}/>
                        <Menu.Item name='МКХ-10' as={Link} to={'/mkh10'} active={activeItem === '/mkh10'} onClick={this.handleItemClick}/>
                        <Menu.Item name='TODO' as={Link} to={'/todo'} active={activeItem === '/todo'} onClick={this.handleItemClick}/>
                    </Menu>
                {/*</Segment>*/}

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}