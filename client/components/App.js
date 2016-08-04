import React, {Component} from "react"
import NavBar from '../containers/NavBar'


const App = (props) => {
  return (
    <div>
      <NavBar />
      <div className="temp">
        <div className="temp">
          { props.children }
        </div>
      </div>
    </div>
  )
}

export default App;