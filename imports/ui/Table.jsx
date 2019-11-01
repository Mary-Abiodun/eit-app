import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Eits } from '../api/eits';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="row">  </th>
        <th scope="row">Full Name</th>
        <th scope="row">Age</th>
        <th scope="row">Country</th>
        <th scope="row">Phone Number</th>
        <th scope="row"><button className="btn" onClick={() => Meteor.call('eits.deleteSelected')}>Delete Selected</button></th>

      </tr>
    </thead>
  )
}


const TableBody = props => {

  const rows = props.eitData.map((row, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={row.checked}
            onChange={(event) => Meteor.call('eits.setChecked', row._id, event.target.checked)}
          />
        </td>
        <td>{row.name}</td>
        <td>{row.age}</td>
        <td>{row.country}</td>
        <td>{row.phone}</td>
        <td>

          <Link className="btn" type="button" to={`/edit/${row._id}`}>Edit </Link>&nbsp;
          <button className="btn" type="button" onClick={() => Meteor.call('eits.remove', row._id)}>Delete</button>
        </td>


      </tr>
    )
  });
  return (
      <tbody>{rows}</tbody>
  )

}
class TABLE extends Component {


  render() {
    const { eitData } = this.props
    return (
      <table className="table">
        <TableHeader />
        <TableBody {...this.props} />
      </table>
    )
  }
}

export default withTracker(props => {
  return {
    eitData: Eits.find({}).fetch()
  }

})(TABLE);
