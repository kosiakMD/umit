/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/18/17
 * Time: 21:58
 */
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { Grid, Button, Checkbox, Form, Dimmer, Loader, Segment, TextArea } from 'semantic-ui-react';
import { Link, NavLink, Match } from 'react-router-dom';
import BreadCramps from '../../shared/BreadCramps';

/*export default*/ class Diagnose extends Component {
    static propTypes = {
        // This component gets the diagnose to display through a React prop.
        // We can use propTypes to indicate it is required
        // diagnose: PropTypes.object.isRequired,
    }

    constructor(props) {
        super();
        autoBind(this);

        let id = props.match.params.diagnoseID;
        this.getDiagnose(id);

        this.state = {
            diagnose: {
                // 'name',
                // 'consider',
                // 'criteria',
                // 'exclusion',
                // 'inclusion',
                // 'note',
            },
            activeLoader: true,
        };

        this.editMode = props.editMode || true;
        this.fields = [
            { fieldName: '_id', label: 'Code', placeholder: 'Code', refName: 'code'},
            { fieldName: 'letter', label: 'Letter', placeholder: 'Letter', refName: 'letter'},
            { fieldName: 'name', label: 'Name', placeholder: 'Name', refName: 'name'},
            { fieldName: 'consider', label: 'Consider', placeholder: 'Consider', refName: 'consider'},
            { fieldName: 'criteria', label: 'Criteria', placeholder: 'Criteria', refName: 'criteria'},
            { fieldName: 'exclusion', label: 'Exclusion', placeholder: 'Exclusion', refName: 'exclusion'},
            { fieldName: 'inclusion', label: 'Inclusion', placeholder: 'Inclusion', refName: 'inclusion'},
            { fieldName: 'note', label: 'Note', placeholder : 'Note', refName: 'note'},
        ];
    }

    getDiagnose(id) {
        Meteor.call('IcpcCollection.getByID', id, (error, result) => {
            if (error){
                console.error(error);
                return alert(error);
            }
            console.log(result)
            this.setState({
                diagnose: result[0] || {},
                activeLoader: false,
            });
        });
    }

    saveForm(event) {
        event.preventDefault();
        // let id = this.refs[this.fields[0].refName].value;
        let { diagnose } = this.state;
        let id = diagnose._id;
        let data = {};
        this.fields.slice(2).map((field)=>{
            // data[field.fieldName] = this.refs[field.refName].value;
            data[field.fieldName] = diagnose[field.refName];
        });
        this.setState({ activeLoader: true });
        // console.log('saveForm',data)
        Meteor.call('IcpcCollection.updateByID', id, data, (error, result) => {
            this.setState({ activeLoader: false });
            if (error) {
                console.error(error);
                alert(error);
            }else{
                console.info('updateByID successful',result);
            }
        });
    }

    onChange(event, fieldName) {
        let value = event.target.value;
        let diagnose = {...this.state.diagnose};
        diagnose[fieldName] = value;
        this.setState({ diagnose });
    }

    getFields() {
        let { diagnose } = this.state;
        let readOnly = !this.editMode;
        return this.fields.slice(2).map((field, key)=>{
            return (
                <Form.Field key={'field_'+key}>
                    <label>{field.label}</label>
                    <TextArea placeholder={field.placeholder} ref={field.refName} readOnly={readOnly} autoHeight
                            onChange={(event)=>this.onChange(event, field.fieldName)} value={diagnose[field.fieldName]}/>
                </Form.Field>
            )
        })
    }

    render() {
        const { diagnose, activeLoader } = this.state;

        return (
            <div>
                <BreadCramps history={this.props.history}/>
                <Grid container columns="12">
                    <Grid.Row>
                    <Segment>
                        <Dimmer active={activeLoader} inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Form>
                            <Form.Field>
                                <label>{this.fields[0].label}</label>
                                <input placeholder={this.fields[0].placeholder} ref={this.fields[0].refName} readOnly value={diagnose._id}/>
                            </Form.Field>
                            <Form.Field>
                                <label>{this.fields[1].label}</label>
                                <input placeholder={this.fields[1].placeholder} ref={this.fields[1].refName} readOnly value={diagnose._id}/>
                            </Form.Field>
                            {this.getFields()}
                            <Button type='submit' onClick={this.saveForm}>Submit</Button>
                        </Form>
                    </Segment>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}


export default createContainer(() => {
    return {
        // groups: Meteor.call('GroupCollection.get'),
        // groups: GroupCollection.find().fetch(),
        // incompleteCount: IcpcCollection.find({ checked: { $ne: true } }).count(),
        // currentUser: Meteor.user(),
    };
}, Diagnose);