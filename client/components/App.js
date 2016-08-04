import React, {Component} from "react"
import NavBar from '../containers/NavBar'


const App = (props) => {
  return (
    <div>
      <NavBar />
      <div className="container-fluid text-center">
        <div className="row content">
          { props.children }
        </div>
      </div>
    </div>
  )
}

export default App;