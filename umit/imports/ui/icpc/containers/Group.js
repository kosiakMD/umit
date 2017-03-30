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
import autoBind from 'react-autobind';
import { IcpcCollection, GroupCollection } from '../../../api/icpc.js';
import AccountsUIWrapper from '../../components/AccountsUIWrapper';
import Element from '../components/DiagnoseElement';
import { Form, List, Button, Input } from 'semantic-ui-react';
import BreadCramps from '../../shared/BreadCramps';

// App component - represents the whole app
/*export default */class Group extends Component {
    static propTypes = {
        // diagnoses: PropTypes.array.isRequired,
        // incompleteCount: PropTypes.number.isRequired,
    }

    constructor(props) {
        super();
        autoBind(this);
        console.log('constructor',props)

        let group = props.match.params.group;
        this.state = {
            hideCompleted: false,
            loading: true,
            savingGroup: false,
            group: group,
            currentGroupName: props.location.state.name,
            groupName: props.location.state.name,
            letter: props.location.state.letter,
            count: props.location.state.count,
            id: props.location.state._id,
            diagnoses: [],
        };

        Meteor.call('IcpcCollection.getListByLetter', group, (error, result)=>{
            this.setState({diagnoses: result},()=>{});
        })
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps',props)
    }

    toggle(prop, value = !this.state[prop]) {
        this.setState({[prop]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let letter = this.state.letter;
        let groupName = this.state.groupName;
        this.toggle('savingGroup', true);
        Meteor.call('GroupCollection.updateName', letter, groupName, (error, result) => {
            this.toggle('savingGroup', false);
            console.log(result)
            if (error) {
                console.error(error); alert(error);
            } else if (result) {
                this.setState({ currentGroupName: groupName });
            }
        })
    }

    onChange(event) {
        let groupName = event.target.value;
        this.setState({ groupName });
    }

    renderElements() {
        let diagnoses = this.state.diagnoses || [];
        return diagnoses.map((diagnose) => (
            <Element key={diagnose._id} diagnose={diagnose} />
        ));
    }

    render() {
        const { group } = this.state;
        // console.log(Meteor.user(),Meteor.userId());
        return (
            <div className="container">
                <header>
                    <BreadCramps history={this.props.history}/>

                    <h2>ICPC - {this.state.currentGroupName}</h2>
                    <h3>letter - {group} | count - {this.state.count}</h3>

                    { this.props.currentUser ?
                    <Form className="new-group" onSubmit={this.handleSubmit} >
                        <Form.Field>
                            <Form.Group>
                                <Input type="text"
                                       ref={(val)=>this.groupName=val}
                                       name="groupName"
                                       placeholder="Group name"
                                    //label="Group name"
                                       value={this.state.groupName}
                                       onChange={this.onChange}
                                       size='tiny'
                                       disabled={this.state.savingGroup}
                                />
                                <Button size='tiny' color='violet'
                                        loading={this.state.savingGroup}
                                        onClick={this.handleSubmit}>Save</Button>
                            </Form.Group>
                        </Form.Field>
                    </Form>
                        : null}

                </header>

                <List divided relaxed link selection>
                    {this.renderElements()}
                </List>
            </div>
        );
    }
}

export default createContainer(({ letter }) => {
    console.log('createContainer', letter, arguments)
    return {
        // diagnoses: Meteor.call('IcpcCollection.getListByLetter', 'A'),
        // diagnoses: IcpcCollection.find({letter: 'A'}, {letter: 1, name: 1}).fetch(),
        // incompleteCount: IcpcCollection.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, Group);
