import React from "react"
export default(props) => {
  return (
    <div key={props.id} className="list-group-item">
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
