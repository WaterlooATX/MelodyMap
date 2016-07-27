import React from 'react';
import { Link } from 'react-router';

export default function PageOne({
  textFieldValue,
  updateTextFieldValue,
  clearTextFieldValue
}) {
  return (
    <div>
      <div> This is the first page </div>
      <Link to="/"> Home </Link>
      <input
        type='text'
        placeholder='type here'
        value={textFieldValue}
        onChange={(e) => updateTextFieldValue(e.target.value)}
      />
      <button onClick={() => clearTextFieldValue()}>
        Clear Field
      </button>
    </div>
  );
}

PageOne.propTypes = {
  textFieldValue: React.PropTypes.string,
  updateTextFieldValue: React.PropTypes.func,
  clearTextFieldValue: React.PropTypes.func
};
