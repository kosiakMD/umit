/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/18/17
 * Time: 21:57
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../../components/AccountsUIWrapper';
import Element from '../components/GroupElement';
import { List } from 'semantic-ui-react';
import { IcpcCollection, GroupCollection } from '../../../api/icpc.js';
import BreadCramps from '../../shared/BreadCramps';

// App component - represents the whole app
class Icpc extends Component {
    static propTypes = {
        groups: PropTypes.array.isRequired,
        // incompleteCount: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        // IcpcCollection.insert({
        //     text,
        //     createdAt: new Date(), // current time
        //     owner: Meteor.userId(),           // _id of logged in user
        //     username: Meteor.user().username,  // username of logged in user
        // });
        Meteor.call('IcpcCollection.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted = () => {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderElements() {
        let filteredElements = this.props.groups;
        if (this.state.hideCompleted) {
            filteredElements = filteredElements.filter(group => !group.checked);
        }
        return filteredElements.map((group) => (
            <Element key={group._id} group={group} />
        ));
    }

    render() {
        // console.log(Meteor.user(),Meteor.userId());
        return (
            <div className="container">
                <header>
                    <BreadCramps history={this.props.history}/>

                    <h1>ICPC List ({this.props.incompleteCount})</h1>
                </header>

                <List divided relaxed link selection>
                    {this.renderElements()}
                </List>
            </div>
        );
    }
}

export default createContainer(() => {
    // console.log(Meteor.call('GroupCollection.get'))
    return {
        // groups: Meteor.call('GroupCollection.get'),
        groups: GroupCollection.find().fetch(),
        // incompleteCount: IcpcCollection.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, Icpc);