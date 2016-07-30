import React from "react"
export default(props) => {

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  let checkSelected = function(propsSelected) {
    return (propsSelected) ?
      "active list-group-item" : "list-group-item";
  }

  return (
    <div key={props.id} className={checkSelected(props.selected)}>
      <div className="show-name list-group-item-heading">
        <h4>{props.displayName}</h4>
      </div>
      <div className="show-venue">
        <h6>{props.venue}</h6>
      </div>
      <div className="show-date">
        <h6>{props.startDate}</h6>
      </div>
      <div className="show-location">
        <h6>{props.city}</h6>
      </div>
    </div>
  )
}
