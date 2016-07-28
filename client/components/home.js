import React from 'react';
import NavBar from './NavBar'
import { browserHistory, Link } from 'react-router';


export default function Home() {
  return (
    <div>
      <NavBar/>
      <Link to="/PageOne"> Page 1 </Link>
      <button onClick={() => browserHistory.push('/PageTwo')} >
        Page 2
      </button>
    </div>
  );
}
