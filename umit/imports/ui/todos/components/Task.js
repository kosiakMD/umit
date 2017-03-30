/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/18/17
 * Time: 21:58
 */
import React, { Component, PropTypes } from 'react';
import { List, Item } from 'semantic-ui-react';

// import { TaskCollection } from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
    static propTypes = {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: PropTypes.object.isRequired,
    }

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        // TaskCollection.update(this.props.task._id, {
        //     $set: { checked: !this.props.task.checked },
        // });
        Meteor.call('TaskCollection.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        // TaskCollection.remove(this.props.task._id);
        Meteor.call('TaskCollection.remove', this.props.task._id);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <List.Item>
                <Item>
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.props.task.checked}
                        onClick={this.toggleChecked.bind(this)}
                    />
                </Item>

                <List.Content>
                    <List.Header as='a'>{this.props.task.username}</List.Header>

                    <List.Description as='a'>

                        <span className={"text " + taskClassName}>{this.props.task.text}</span>

                        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                            &times;
                        </button>


                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
}
