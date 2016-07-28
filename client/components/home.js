import React from 'react';
import { browserHistory, Link } from 'react-router';
//import NavBar from './NavBar'

export default function Home() {
  return (
    <div>
      <Link to="/PageOne"> Page 1 </Link>
      <button onClick={() => browserHistory.push('/PageTwo')} >
        Page 2
      </button>
    </div>
  );
}
