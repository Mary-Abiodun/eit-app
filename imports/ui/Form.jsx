import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from "react-router-dom";

class FORM extends Component{
  constructor(props){
    super(props)
    this.initialState ={
      name:'',
      age:'',
      phone:'',
      country:'',
      area:'',
      fact:'',
      createdAt: '',
      owner: '',           // _id of logged in user
      username: '',  // username of logged in user
    }
    this.state = this.initialState
  }

  handleChange =( event )=> {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    })
  }

  submitForm = (event) => {
    const {name, age, phone, country, area, fact, createdAt, owner, username} = this.state;
    Meteor.call('eits.insert', name, age, phone, country, area, fact,createdAt, owner, username)

  }

  render (){
    const {name, age, phone, country, area, fact} = this.state
    return (

      <form className="form-group w-50">
          <label>Full Name </label>
          <input
              className="form-control"
              type="text"
              name="name"
              ref="name"
              value={name}
              onChange={this.handleChange}
          />
          <label>Age</label>
          <input
              className="form-control"
              type="text"
              ref="age"
              name="age"
              value={age}
              onChange={this.handleChange}
          />
          <label>Country </label>
          <input
              className="form-control"
              type="text"
              ref="country"
              name="country"
              value={country}
              onChange={this.handleChange}
          />
          <label>Phone Number</label>
          <input
            className="form-control"
              type="text"
              ref="phone"
              name="phone"
              value={phone}
              onChange={this.handleChange}
          />

          <br></br>
          <Link to="/" className="btn" type="button" value="Submit" onClick={this.submitForm}>Submit</Link>
    </form>
  )
  }
}

export default FORM
