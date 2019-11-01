import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Eits } from '../api/eits';

class UpdateForm extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      name: '',
      age: '',
      phone: '',
      country: '',
      area: '',
      fact: '',
      updatedAt: '',
      owner: '',           // _id of logged in user
      username: '',  // username of logged in user
    }
    this.state = this.initialState
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }

  submitForm = (event) => {

    const id = this.props.match.params.id;

    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const age = ReactDOM.findDOMNode(this.refs.age).value.trim();
    const country = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    const area = ReactDOM.findDOMNode(this.refs.area).value.trim();
    const fact = ReactDOM.findDOMNode(this.refs.fact).value.trim();

    Meteor.call('eits.edit', id, {
      name: name,
      age: age,
      phone: phone,
      country: country,
      area: area,
      fact: fact,
      updatedAt: new Date(),
      owner: Meteor.userId(),           // _id of logged in user
      // username: Meteor.user().username,  // username of logged in user
    })


  }

  render() {
    console.log(this.props);

    const eit = this.props.EIT

    
    return (
      <form className="form-group w-50">
        <label>Full Name </label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref="name"
          defaultValue={eit ? eit.name : ''}
          onChange={this.handleChange}
        />
        <label>Age</label>
        <input
          type="text"
          ref="age"
          name="age"
          className="form-control"
          defaultValue={eit ? eit.age : ''}
          onChange={this.handleChange}
        />
        <label>Country </label>
        <input
          type="text"
          className="form-control"
          ref="country"
          name="country"
          defaultValue={eit ? eit.country : ''}
          onChange={this.handleChange}
        />
        <label>Phone Number</label>
        <input
          type="text"
          className="form-control"
          ref="phone"
          name="phone"
          defaultValue={eit ? eit.phone : ''}
          onChange={this.handleChange}
        />
        <br></br>
        <Link to="/home" className="btn" type="button" value="Update" onClick={this.submitForm}>Update</Link>

      </form>
    )
  }
}

export default withTracker(props => {
  const id = props.match.params.id;
  return {
    EIT: Eits.findOne({ _id: id }),
    currentUser: Meteor.user(),
  };
})(UpdateForm);
