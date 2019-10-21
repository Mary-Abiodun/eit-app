import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
 this.state = new ReactiveDict();
});


Template.body.helpers({

  tasks() {

      return Tasks.find({}, { sort: { createdAt: -1 } });
    },

  //   incompleteCount() {
  //   return Tasks.find({ checked: { $ne: true } }).count();
  // },

});

Template.body.events({
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
      name: name,
      country: country,
      age: age,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.name.value = '';
    target.country.value = '';
    target.age.value = '';
  },
});
