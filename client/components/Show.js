import React from "react"
export default(props) => {

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  let checkSelected = function(propsSelected) {
    return (propsSelected) ? "active list-group-item" : "list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  let onClickHandler = function(event) {
    event.preventDefault();
    props.sendToState(props.id)
  }

  return (
    <div data-id={props.id}
      className={checkSelected(props.selected)}
      onClick={onClickHandler}
    >
      <h4 className="show-name list-group-item-heading">{props.displayName}</h4>
      <p className="show-venue">{props.venue}</p>
      <p className="show-date">{props.startDate}</p>
      <p className="show-location">{props.city}</p>
    </div>
  )
}
