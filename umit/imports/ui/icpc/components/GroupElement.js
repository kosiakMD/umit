/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/18/17
 * Time: 21:58
 */
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import { IcpcCollection } from '../../api/group.js';
import { List, Item } from 'semantic-ui-react';
import { Link, NavLink, Match } from 'react-router-dom';


// Task component - represents a single todo item
export default class Element extends Component {
    static propTypes = {
        // This component gets the group to display through a React prop.
        // We can use propTypes to indicate it is required
        group: PropTypes.object.isRequired,
    }

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        // IcpcCollection.update(this.props.group._id, {
        //     $set: { checked: !this.props.group.checked },
        // });
        Meteor.call('IcpcCollection.setChecked', this.props.group._id, !this.props.group.checked);
    }

    deleteThisTask() {
        // IcpcCollection.remove(this.props.group._id);
        // Meteor.call('IcpcCollection.remove', this.props.group._id);
    }

    render() {
        const { group } = this.props;
        const { letter, count, name, _id } = group;
        // Give group a different className when they are checked off,
        // so that we can style them nicely in CSS
        const groupClassName = this.props.group.checked ? 'checked' : '';

        return (
            <List.Item>
                <Link to={{pathname: 'icpc/'+letter, state: {letter, count, name, _id} }}>
                    <Item></Item>

                    <List.Content>
                        {/*<List.Header></List.Header>*/}

                        <List.Description >

                            <span className={'text ' + groupClassName}>{letter} - {count} - {name}</span>

                        </List.Description>
                    </List.Content>
                </Link>
            </List.Item>
        );
    }
}
