/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/18/17
 * Time: 21:58
 */
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Item } from 'semantic-ui-react';
import { Link, NavLink, Match } from 'react-router-dom';


// Task component - represents a single todo item
export default class Element extends Component {
    static propTypes = {
        // This component gets the diagnose to display through a React prop.
        // We can use propTypes to indicate it is required
        diagnose: PropTypes.object.isRequired,
    }

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        // IcpcCollection.update(this.props.diagnose._id, {
        //     $set: { checked: !this.props.diagnose.checked },
        // });
        Meteor.call('IcpcCollection.setChecked', this.props.diagnose._id, !this.props.diagnose.checked);
    }

    deleteThisTask() {
        // IcpcCollection.remove(this.props.diagnose._id);
        // Meteor.call('IcpcCollection.remove', this.props.diagnose._id);
    }

    render() {
        const { diagnose } = this.props;
        const { _id, letter, code, name } = diagnose;
        // Give diagnose a different className when they are checked off,
        // so that we can style them nicely in CSS
        const diagnoseClassName = this.props.diagnose.checked ? 'checked' : '';

        return (
            <List.Item>
                <NavLink to={{pathname: `${letter}/${_id}`, letter: letter, id: _id}}>
                    <Item></Item>

                    <List.Content>
                        {/*<List.Header></List.Header>*/}

                        <List.Description >

                            <span className={'text ' + diagnoseClassName}>{_id} - {name}</span>

                        </List.Description>
                    </List.Content>
                </NavLink>
            </List.Item>
        );
    }
}
