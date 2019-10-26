import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './edit.html';

Template.edit.helpers({

  tasks() {
    const id = FlowRouter.getParam('id');
    		// console.log(id);
    		return Tasks.findOne(id);    },
});

Template.edit.events({
  'submit .new-edit'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const country = target.country.value;
    const age = target.age.value;


    const id = FlowRouter.getParam('id');

    // Insert a task into the collection
    Tasks.update(id, {
    	$set: {

    		name,
    		age,
    		country,

    	}
    });

    // Clear form
    // target.value = '';
    FlowRouter.go('/');

}
});
