/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/19/17
 * Time: 00:16
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
    'TaskCollection.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        TaskCollection.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'TaskCollection.remove'(taskId) {
        check(taskId, String);

        TaskCollection.remove(taskId);
    },
    'TaskCollection.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        TaskCollection.update(taskId, { $set: { checked: setChecked } });
    },
});

export const TaskCollection = new Mongo.Collection('tasks');