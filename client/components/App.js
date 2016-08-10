import React, {Component} from "react"
import NavBar from "../containers/NavBar"

const App = (props) => {
  return (
    <div>
      <NavBar/>
      <div className="temp">
        {props.children}
      </div>
    </div>
  )
}

export default App;
