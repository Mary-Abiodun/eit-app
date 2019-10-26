import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.home.helpers({

  tasks() {

      return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});

Template.home.events({
  'submit .new-input'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const country = target.country.value;
    const age = target.age.value;

    // Insert a task into the collection
    Tasks.insert({
      name,
      country,
      age,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.name.value = '';
    target.country.value = '';
    target.age.value = '';
  },

  'click .bulk-delete'() {
    const checkEits = Tasks.find({ checked: true}).fetch();
    checkEits.forEach(task => {
    Tasks.remove({ _id: task._id});
})
    },
});
