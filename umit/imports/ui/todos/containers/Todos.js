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
import Task from '../components/Task';

import { List } from 'semantic-ui-react';

import { TaskCollection } from '../../../api/tasks.js';

// Todo component - represents the whole app
class Todo extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        incompleteCount: PropTypes.number.isRequired,
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

        // TaskCollection.insert({
        //     text,
        //     createdAt: new Date(), // current time
        //     owner: Meteor.userId(),           // _id of logged in user
        //     username: Meteor.user().username,  // username of logged in user
        // });
        Meteor.call('TaskCollection.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted = () => {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form> : null}

                </header>

                <List divided relaxed link>
                    {this.renderTasks()}
                </List>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        tasks: TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: TaskCollection.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, Todo);