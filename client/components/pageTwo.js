import React from 'react';
import { Link } from 'react-router';

export default function PageTwo() {
  return (
    <div>
      <div> This is the second page </div>
      <Link to="/"> Home </Link>
    </div>
  );
}
