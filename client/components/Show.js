import React, {Component} from "react"

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  let checkSelected = function(propsSelected) {
    return (propsSelected) ? "active list-group-item" : "list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  let onClickHandler = function(event) {
    event.preventDefault();
    props.sendToState(props.id)
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <p className="show-venue">{props.venue}</p>
              <p className="show-date">{props.startDate}</p>
              <p className="show-location">{props.city}</p>
            </div>
        </div>
      </div>
    )
  }
}
