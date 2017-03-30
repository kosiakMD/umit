/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/19/17
 * Time: 00:16
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

Meteor.methods({
    /*
     * ICPC Groups
     * GroupCollection = db.icpc_groups
     */
    'GroupCollection.get'() {
        GroupCollection.find().fetch();
    },
    'GroupCollection.updateName'(letter, name) {
        return GroupCollection.update({letter: letter}, {$set: { name: name }});
    },
    'GroupCollection.updateNameByID'(ID, name) {
        return GroupCollection.update(
            {_id: ID},
            { $set: { name: name }}
        );
    },
    'GroupCollection.getGroupCount'(letter) {
        IcpcCollection.find({letter: letter}).count();
    },
    'GroupCollection.updateGroupCount'(letter) {
        return GroupCollection.find().forEach((result)=>{
            letter = result.letter;
            GroupCollection.update(
                {_id: result._id},
                { $set: {
                    count: IcpcCollection.find({letter: letter}).count()}
                }
            )
        });
    },
    /*
     * ICPC diseases
     * IcpcCollection = db.icpc_icpc
     */
    'IcpcCollection.getCountByLetter'(letter) {
        IcpcCollection.find({letter: letter}).count();
    },
    'IcpcCollection.getListByLetter'(letter) {
        check(letter, Match.OneOf(String) );
        !isNaN(+letter) && (letter =+ letter);
        return IcpcCollection.find({letter: letter}, {letter: 1, name: 1}).fetch();
    },
    'IcpcCollection.getAllByLetter'(letter) {
        check(letter, Match.OneOf(String, Number) );
        IcpcCollection.find({letter: letter}).fetch();
    },
    'IcpcCollection.getByID'(ID) {
        check(ID, String );
        return IcpcCollection.find({_id: ID}).fetch();
    },
    'IcpcCollection.updateByID'(ID, data) {
        check(ID, Match.OneOf(String) );
        return IcpcCollection.update(ID, { $set: {
            letter: data.letter,
            consider: data.consider,
            criteria: data.criteria,
            exclusion: data.exclusion,
            inclusion: data.inclusion,
            name: data.name,
            note: data.note,
        } });
    },
    'IcpcCollection.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        IcpcCollection.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'IcpcCollection.remove'(ID) {
        check(ID, String);

        IcpcCollection.remove(ID);
    },
    'IcpcCollection.setChecked'(ID, setChecked) {
        check(ID, String);
        check(setChecked, Boolean);

        IcpcCollection.update(ID, { $set: { checked: setChecked } });
    },
});

// console.log('Mongo',new Mongo.Collection('icpc_icpc').find())

export const IcpcCollection = new Mongo.Collection('icpc_icpc');
export const GroupCollection = new Mongo.Collection('icpc_groups');